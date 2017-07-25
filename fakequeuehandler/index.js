const sessionRepo = require('database/repository/sessionRepository.js');
const messageRepo = require('database/repository/messageRepository.js');
const fakeQueueRepo = require('database/repository/fakeQueueRepository.js');

const AWS = require('aws-sdk');


function handleMessage(event, context, callback) {
     if(context)
        context.callbackWaitsForEmptyEventLoop = false;
    console.log(event);
    let message = event.Records[0].Sns.Message;
    console.log(message);
    try{
        message = JSON.parse(event.Records[0].Sns.Message);
    }catch(e){
        console.log(e);
    }
    initSns();
    fakeQueueRepo.createQueue(message).then(q =>{
        message.queueId = q.id;
        publishToSns(message, callback);
    }).catch(e=>{
        console.log(e);
    })
    
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
        TargetArn: 'arn:aws:sns:us-west-2:459375513878:Message-Queued'
    }, function(err, data){
        callback(err,data);
    });
}

exports.handler = handleMessage;