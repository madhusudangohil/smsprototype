const db = require('../models');

function getQueue(messageId){
    return db.FakeQueue.findOne({
        where:{
            messageId: messageId
        }
    });
}


function createQueue(fakeQueue){
   
    return db.FakeQueue.create({
        messageId: fakeQueue.messageId,
        sessionId: fakeQueue.sessionId,
        fromNumber: fakeQueue.from,        
        CreatedAt: db.Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: db.Sequelize.literal('CURRENT_TIMESTAMP')
    })      
   
}

function updateQueue(queueId, status, assignedTo){
    return db.FakeQueue.findOne({
        where:{id: queueId}
    }).then(q => {
        q.status = status;
        q.assignedTo = assignedTo
        return q.save();
    })    
}


module.exports = {
    getQueue: getQueue,
    createQueue: createQueue,
    updateQueue: updateQueue
}