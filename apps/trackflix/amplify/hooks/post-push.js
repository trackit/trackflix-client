const AWS = require('aws-sdk');
const fs = require('fs');

const currentBackend = JSON.parse(fs.readFileSync('amplify/#current-cloud-backend/amplify-meta.json'));

const REGION = currentBackend.providers.awscloudformation.Region;
const ROOT_ID = currentBackend.providers.awscloudformation.StackId;

const iam = new AWS.IAM();
const cloudformation = new AWS.CloudFormation({
    region: REGION,
});
const lambda = new AWS.Lambda({
    region: REGION,
});

const fixAdminGroupPolicyIssue = async () => {
    console.log('fixing admin group policy.');
    const vodInputBucket = currentBackend.video.trackflixVOD.output.oVODInputS3;
    const adminGroupRoleArn = currentBackend.auth.userPoolGroups.output.AdminGroupRole;
    const adminGroupRoleName = adminGroupRoleArn.split('/').slice(-1)[0]; 

    const policy = await iam.getRolePolicy({
        RoleName: adminGroupRoleName,
        PolicyName: 'trackflixaa182671-admin-group-policy',
    }).promise();
    const policyDocument = JSON.parse(decodeURIComponent(policy.PolicyDocument));
    policyDocument.Statement[0].Resource = `arn:aws:s3:::${vodInputBucket}/*`

    await iam.putRolePolicy({
        RoleName: adminGroupRoleName,
        PolicyName: 'trackflixaa182671-admin-group-policy',
        PolicyDocument: JSON.stringify(policyDocument),
    }).promise();
    console.log('admin group policy ready.');
}

const getVideoStack = async (nextToken = null) => {
    const stacks = await cloudformation.describeStacks({
        NextToken: nextToken || undefined,
    }).promise();

    const videoStack = stacks.Stacks.find(stack => 
        stack.RootId === ROOT_ID &&
        stack.StackName.includes('videotrackflixVOD')
    );
    if (videoStack) {
        return videoStack;
    }

    if (stacks.NextToken) {
        return (await getVideoStack(stacks.NextToken));
    }

    return undefined;
}

const setupInputWatcher = async () => {
    console.log('setting up input watcher.');
    const videoStack = await getVideoStack();
    const inputWatcherArn = videoStack.Parameters.find(param => param.ParameterKey === 'pInputTriggerLambda').ParameterValue;
    const mediaInfoLambdaArn = currentBackend.function.mediainfo.output.Arn;
    const vodInputBucket = currentBackend.video.trackflixVOD.output.oVODInputS3;
    const accountId = currentBackend.providers.awscloudformation.StackId.split(':')[4];
    const apiId = currentBackend.api.trackflixAPI.output.GraphQLAPIIdOutput;

    const lambdaConfiguration = await lambda.getFunctionConfiguration({
        FunctionName: inputWatcherArn,
    }).promise();

    const inputWatcherEnv = lambdaConfiguration.Environment.Variables;
    inputWatcherEnv.REGION = REGION;
    inputWatcherEnv.GRAPHQLEP = currentBackend.api.trackflixAPI.output.GraphQLAPIEndpointOutput;

    await lambda.updateFunctionConfiguration({
        FunctionName: inputWatcherArn,
        Layers: [
            mediaInfoLambdaArn,
        ],
        Environment: {
            Variables: inputWatcherEnv,
        }
    }).promise();

    const inputWatcherRoleName = lambdaConfiguration.Role.split('/').slice(-1)[0]; ;
    const policy = await iam.getRolePolicy({
        RoleName: inputWatcherRoleName,
        PolicyName: 'S3PolicyTesting',
    }).promise();
    const policyDocument = JSON.parse(decodeURIComponent(policy.PolicyDocument));
    policyDocument.Statement = [...policyDocument.Statement, ...[{
        "Action": [
            "appsync:GraphQL"
        ],
        "Resource": [
            `arn:aws:appsync:us-west-2:${accountId}:apis/${apiId}/types/Query/*`,
            `arn:aws:appsync:us-west-2:${accountId}:apis/${apiId}/types/Mutation/*`
        ],
        "Effect": "Allow"
    },
    {
        "Action": [
            "s3:GetObject"
        ],
        "Resource": [
            `arn:aws:s3:::${vodInputBucket}/*`
        ],
        "Effect": "Allow"
    }]];

    await iam.putRolePolicy({
        RoleName: inputWatcherRoleName,
        PolicyName: 'S3PolicyTesting',
        PolicyDocument: JSON.stringify(policyDocument),
    }).promise();
    console.log('input watcher ready.');
}

const main = async () => {
    await fixAdminGroupPolicyIssue();
    await setupInputWatcher();
}

main();