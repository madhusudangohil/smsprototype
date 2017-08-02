let index = require('./index.js');
const audioLoader = require('audio-loader');
let event = 
{
  "Records": [
    {
      "EventVersion": "1.0",
      "EventSubscriptionArn": "arn:aws:sns:us-west-2:459375513878:Message-Queued",
      "EventSource": "aws:sns",
      "Sns": {
        "SignatureVersion": "1",
        "Timestamp": "1970-01-01T00:00:00.000Z",
        "Signature": "EXAMPLE",
        "SigningCertUrl": "EXAMPLE",
        "MessageId": "95df01b4-ee98-5cb9-9903-4c221d41eb5e",
        "Message": {
              "messageId": 54,
              "from": "%2B13097501417",
              "queueId": 1,
              "sessionId": 10
        },      
        "Type": "Notification",
        "UnsubscribeUrl": "EXAMPLE",
        "TopicArn": "arn:aws:sns:EXAMPLE",
        "Subject": "TestInvoke"
      }
    }
  ]
}


// index.handler(event, null, function(err, data){
//     console.log(data);
// })


var fs = require('fs'),
request = require('request');

 var requestSettings = {
    method: 'GET',
    url: 'https://api.twilio.com/2010-04-01/Accounts/AC119ac6bc1668aaaaa2941d0a72a1b4b1/Messages/MM85bdca3d308b66afae91a189500e0267/Media/ME5b468859369a6dbf1b6fb3c2254580d9',
    encoding:null
};


request(requestSettings, function(error, response, body) {
    console.log(body);
});