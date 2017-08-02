const sessionRepo = require('database/repository/sessionRepository.js');
const messageRepo = require('database/repository/messageRepository.js');
const AWS = require('aws-sdk');
const lexruntime = new AWS.LexRuntime({
    'region': 'us-east-1'
});

const params = require('./params.js');
const audioLoader = require('audio-loader');
const request = require('request');

params.sessionAttributes = {};

 var requestSettings = {
    method: 'GET',    
    encoding:null
};


function handleMessage(event, context, callback) {
    if (context)
        context.callbackWaitsForEmptyEventLoop = false;
    
    console.log(event);
    let message = event.Records[0].Sns.Message;
    
    try {
        message = JSON.parse(message);
    } catch (e) {
        console.log('exception parsing ${e}')
    }
    console.log(message);
    populateParamFromMessage(message, callback);    
}

function populateParamFromMessage(message, callback) {
    messageRepo.getMessage(message.messageId).then(r => {
            let m = JSON.parse(r.message);
            console.log(m.message);
            params.userId = decodeURIComponent(message.from).replace('+', '');            
            if(m.message.MediaContentType0 != undefined){
                params.contentType = "audio/x-cbr-opus-with-preamble; preamble-size=0; bit-rate=256000; frame-size-milliseconds=4";
                params.accept = "audio/ogg"
                let mediaUrl = decodeURIComponent(m.message.MediaUrl0);
                console.log(mediaUrl);
                requestSettings.url = mediaUrl;
                request(requestSettings, function(error, response, body) {
                        params.inputStream = body;
                        console.log(body);
                        postContentToLex(message, callback);
                });
            }
            else{
                let body = decodeURIComponent((m.message.Body + '').replace(/\+/g, '%20'));
                console.log('body -' + body);
                params.inputStream = body;
                postContentToLex(message, callback);
            }
        }

    )

}

function postContentToLex(inboundMessage, callback) {
    console.log(params);
    lexruntime.postContent(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(err);
        } else {
            console.log(data);            
            let message = '';

            if (data.dialogState !== 'ElicitIntent') {
                message = data.message;
            } else {
                message = 'I am sorry I cannot understand, an Agent will be with you shortly';
            }
            messageRepo.createOutboundMessage(message, inboundMessage.sessionId).then(r=>{
                initSns();
                let botResponse = {message: message, sessonId: inboundMessage.sessionId, to: inboundMessage.from, outboundMessageId: r.id};
                publishToSns(botResponse, callback);
            })
            
        }

    });
}

function initSns() {
    AWS.config.update({
        region: 'us-west-2'
    })
}

function publishToSns(message, callback) {
    let sns = new AWS.SNS();
    let payload = JSON.stringify(message);
    console.log(payload);

    sns.publish({
        Message: payload,
        TargetArn: 'arn:aws:sns:us-west-2:459375513878:Agent-Response'
    }, function (err, data) {
        callback(err, data);
    });
}

exports.handler = handleMessage;