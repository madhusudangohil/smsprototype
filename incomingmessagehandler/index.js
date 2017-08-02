
var messageRepo  = require('database/repository/messageRepository');
var AWS = require('aws-sdk');

function handleMessage(event, context, callback){
    if(context)
        context.callbackWaitsForEmptyEventLoop = false;
    messageRepo.createMessage({       
        message: event})
        .then(m=>{            
            return publishToSns({messageId: m.id, from: event.From}, callback);            
        })
        .then(s=>console.log(s))
        .catch(e=>{
            console.log(e);
            callback(e);
        })
}

function initSns(region, credentials){
    AWS.config.update({
        region:'us-west-2'
    })
}

function publishToSns(message, callback){
    let sns = new AWS.SNS();
    let payload = JSON.stringify(message);
    console.log(payload);

    return sns.publish({
        Message: payload,        
        TargetArn: 'arn:aws:sns:us-west-2:459375513878:New-Message-Arrived'
    }).promise();
}

module.exports = {
    handler: handleMessage,
    initSns: initSns
}