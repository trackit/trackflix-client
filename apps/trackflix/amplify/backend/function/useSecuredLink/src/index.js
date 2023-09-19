/* Amplify Params - DO NOT EDIT
    API_TRACKFLIXAPI_GRAPHQLAPIENDPOINTOUTPUT
    API_TRACKFLIXAPI_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk')
const executeQuery = require('./executeQuery')

const s3 = new aws.S3({ region: process.env.REGION })
const ses = new aws.SES({ region: process.env.REGION })

const createSecuredLinkLog = async (securedLink, message) => {
    if (!securedLink) return

    await executeQuery('CreateSecuredLinkLog', {
        input: {
            mediaID: securedLink.media.id,
            securedLinkId: securedLink.id,
            message,
        },
    })
}

const isSecuredLinkExpired = (securedLink) =>
    new Date().getTime() > securedLink.expirationUnixTime * 1000

const notify = async (securedLink) => {
    if (!securedLink.notifiedEmail) {
        return
    }

    const params = {
        Destination: {
            ToAddresses: [securedLink.notifiedEmail],
        },
        Message: {
            Body: {
                Text: {
                    Data: `Video ${securedLink.media.title} has been seen using secured link '${securedLink.id}'.`,
                },
            },

            Subject: {
                Data: `Video ${securedLink.media.title} has been seen.`,
            },
        },
        Source: securedLink.notifiedEmail,
    }

    console.log(await ses.sendEmail(params).promise())
}

const decrementUsage = async (securedLink) => {
    securedLink.usagesRemaining--
    if (securedLink.usagesRemaining <= 0) {
        await executeQuery('DeleteSecuredLink', {
            input: { id: securedLink.id },
        })
    } else {
        console.log(
            'UpdateSecuredLink',
            await executeQuery('UpdateSecuredLink', {
                input: {
                    id: securedLink.id,
                    usagesRemaining: securedLink.usagesRemaining,
                },
            })
        )
    }
}

const generateSignedUrl = (securedLink) =>
    s3.getSignedUrl('getObject', {
        Key: `public/${securedLink.media.id}.mp4`,
        Bucket: process.env.VIDEO_INPUT_BUCKET,
        Expires: 60,
    })

exports.handler = async (event) => {
    const { securedLinkId } = event.arguments

    const securedLink = await executeQuery('GetSecuredLink', {
        id: securedLinkId,
    })
    if (
        !securedLink.data.getSecuredLink ||
        isSecuredLinkExpired(securedLink.data.getSecuredLink)
    ) {
        return {
            statusCode: '404',
            body: 'Not found.',
        }
    }

    await decrementUsage(securedLink.data.getSecuredLink)
    await notify(securedLink.data.getSecuredLink)
    const signedUrl = await generateSignedUrl(securedLink.data.getSecuredLink)

    const sourceIp = event.identity.sourceIp[0]
    const username =
        (event.identity.claims && event.identity.claims.username) || 'unknown'

    await createSecuredLinkLog(
        securedLink.data.getSecuredLink,
        `File downloaded by ${username}, IP: ${sourceIp}`
    )
    await createSecuredLinkLog(
        securedLink.data.getSecuredLink,
        `Downloads remaining: ${securedLink.data.getSecuredLink.usagesRemaining}`
    )

    return {
        statusCode: 200,
        body: signedUrl,
    }
}
