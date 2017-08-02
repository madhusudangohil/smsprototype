const sessionRepo = require('database/repository/sessionRepository.js');
const messageRepo = require('database/repository/messageRepository.js');
const AWS = require('aws-sdk');


function handleMessage(event, context, callback) {
    if(context)
        context.callbackWaitsForEmptyEventLoop = false;
    console.log(event);
    let message = event.Records[0].Sns.Message;
    try{
        message = JSON.parse(message);
    }catch(e){
        console.log('exception parsing ${e}')
    }
    console.log(message);

    let phoneNumber = decodeURIComponent(message.from).replace('+', '');
    console.log(phoneNumber);
    let sessionAssignedMessage = {from: phoneNumber, messageId: message.messageId, sessionId: ''};
    initSns();
    sessionRepo.getSession(phoneNumber)
        .then(s => {
            if (s) {
                console.log('messageID ${message.messageId} and session id ${s.id}');
                sessionAssignedMessage.sessionId = s.id;
                return messageRepo.updateMessage(message.messageId, s.id)
            } else {
                sessionRepo.createSession(phoneNumber).then(s => {
                        sessionAssignedMessage.sessionId = s.id;
                        return messageRepo.updateMessage(message.messageId, s.id);
                    }

                )
            }
        }).then(ms => {
                    console.log('message udpated');
                    publishToSns(sessionAssignedMessage, callback);
                });

}

function initSns(){
    AWS.config.update({
        region:'us-west-2'
    })
}

function publishToSns(message, callback){
    let sns = new AWS.SNS();
    let payload = JSON.stringify(message);
    console.log(payload);

    sns.publish({
        Message: payload,        
        TargetArn: 'arn:aws:sns:us-west-2:459375513878:Session-Assigned'
    }, function(err, data){
        callback(err,data);
    });
}

exports.handler = handleMessage;