const AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({ profile: 'individual' });

AWS.config.credentials = credentials;
AWS.config.region = 'us-west-2';
const context = {};
context.done = function () {
    console.log("Lambda Function Complete");
}

const index = require('./index.js');

index.handler({from:'3097501417', body: 'how are you'}, context, function(err, data){
    console.log(data);
})

