#aws lambda delete-function --function-name arn:aws:lambda:us-west-2:459375513878:function:agent-assignment-handler

#aws lambda create-function --function-name   agent-assignment-handler  --zip-file fileb://../agentassignmenthandler/agentassignmenthandler.zip --role arn:aws:iam::459375513878:role/sms_prototype --handler index.handler --runtime nodejs6.10 --region us-west-2 --vpc-config SubnetIds=[subnet-acd7d0e5,subnet-5ee46005],
SecurityGroupIds=[sg-1208bb68] --environment Variables="{botAlias=mobilePlanBot,botName=MobilePlan,DATABASE_URL=mysql://madhu:nickelpen2@channel.cliaj813vwy8.us-west-2.rds.amazonaws.com:3306/sms}"

output 
{
    "TracingConfig": {
        "Mode": "PassThrough"
    },
    "CodeSha256": "dtg0/X0xLCtNlBqsEoELJFAqZP9VOafk1ezPpCmoUNY=",
    "FunctionName": "agent-assignment-handler",
    "VpcConfig": {
        "SubnetIds": [
            "subnet-acd7d0e5",
            "subnet-5ee46005"
        ],
        "VpcId": "vpc-39ad7b5f",
        "SecurityGroupIds": [
            "sg-1208bb68"
        ]
    },
    "MemorySize": 128,
    "FunctionArn": "arn:aws:lambda:us-west-2:459375513878:function:agent-assignment-handler",
    "Version": "$LATEST",
    "Role": "arn:aws:iam::459375513878:role/sms_prototype",
    "Timeout": 3,
    "LastModified": "2017-07-27T16:47:41.710+0000",
    "Handler": "index.handler",
    "Runtime": "nodejs6.10",
    "CodeSize": 10312805,
    "Description": ""
}


aws lambda create-event-source-mapping --event-source-arn arn:aws:sns:us-west-2:459375513878:Message-Queued --function-name agent-assignment-handler

aws sns subscribe --topic-arn arn:aws:sns:us-west-2:459375513878:Message-Queued --protocol lambda --notification-endpoint arn:aws:lambda:us-west-2:459375513878:function:agent-assignment-handler


//how to set credentials in javascrip code.
const credentials = new AWS.SharedIniFileCredentials({ profile: 'dev' });
AWS.config.credentials = credentials;

//how to assume role
var params = {
    RoleArn: 'arn:aws:iam::300813158921:role/GroupAccess-Developers-Channels', /* required */
    RoleSessionName: 'test'
};
let sts = new AWS.STS();
sts.assumeRole(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response
});

//how to set temporary credentials, along with assumed role.
AWS.config.credentials = new AWS.TemporaryCredentials({
    RoleArn: process.env.ASSUMED_ROLE_ARN
},credentials);