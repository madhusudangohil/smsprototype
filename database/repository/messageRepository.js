const db = require('../models');
const repo = require('./sessionRepository.js');

function createMessage(message){
    let messageString =  JSON.stringify(message);
    //let phoneNumber = message.phoneNumber;
   
    return db.InboundMessage.create({
        message: messageString
    });
}

function updateMessage(messageId,sessionId){
    console.log("from repository - ${messageId} - ${sessionId}");
    return db.InboundMessage.findOne({
        where:{
            id: messageId
        },
        attributes: {exclude: ['messageId'] } 
    }).then(m=>{
        m.sessionId = sessionId;
        return m.save();        
    });
}

function getMessage(messageId){
    return db.InboundMessage.findOne({
        where:{
            id:messageId
        },
        attributes: {exclude: ['messageId'] } 
    });
}

function createOutboundMessage(message, sessionId){
    return db.OutboundMessage.create({
        message: message,
        sessionId: sessionId
    });
}

module.exports = {
    createMessage : createMessage,
    updateMessage: updateMessage,
    getMessage: getMessage,
    createOutboundMessage: createOutboundMessage
}