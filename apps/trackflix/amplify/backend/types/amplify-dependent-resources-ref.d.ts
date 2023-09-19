export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "trackflixaa182671": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        },
        "userPoolGroups": {
            "AdminGroupRole": "string"
        }
    },
    "api": {
        "trackflixAPI": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "video": {
        "trackflixVOD": {
            "oVODInputS3": "string",
            "oVODOutputS3": "string",
            "oVodOutputUrl": "string"
        },
        "trackflixLive": {
            "oVideoOutput": "string",
            "oVideoInputURL": "string",
            "oVideoInputKey": "string",
            "oVideoChannelArn": "string"
        }
    },
    "storage": {
        "trackflixAssets": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "resourcesManager": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "useSecuredLink": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "mediainfo": {
            "Arn": "string"
        }
    }
}