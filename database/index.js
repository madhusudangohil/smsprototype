
const repo = require('./repository/sessionRepository.js');

const messagerepo = require('./repository/messageRepository.js');

const fakeQueueRepo = require('./repository/fakeQueueRepository.js');
/*
repo.getSession('3097501417').then(r=>{
    console.log(r.id);
})

messagerepo.createMessage({phoneNumber:'3097501417', message:'I need to talk to Customer rep.'}).then(r=>{
    console.log(r);
})


fakeQueueRepo.createQueue({messageId: 48, sessionId: 10,  fromNumber: '13097501417'}).then(r=>{
    console.log(r);
})

fakeQueueRepo.updateQueue(1,'Read','LexBotAgent').then(r => {
    console.log(r);}    
)

messagerepo.updateMessage(49,10).then(r=>{console.log(r)});
*/

messagerepo.getMessage(51).then(r=>{
    
    console.log(JSON.parse(r.message));
})