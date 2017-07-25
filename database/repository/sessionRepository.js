const db = require('../models');

function getSession(phoneNumber){
    return db.Session.findOne({
        where:{
            phoneNumber: phoneNumber
        }
    });
}


function createSession(phoneNumber){
   
    return db.Session.create({
        phoneNumber: phoneNumber,
        sessionSate: 1,
        CreatedAt: db.Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: db.Sequelize.literal('CURRENT_TIMESTAMP')
    })      
   
}


module.exports = {
    getSession: getSession,
    createSession: createSession
}