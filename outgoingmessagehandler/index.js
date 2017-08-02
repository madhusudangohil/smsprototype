const accountSid = process.env.accountSid; 
const authToken = process.env.authToken;
const fromNumber = process.env.fromNumber;

const smsAdapter = require('smsadapter');

function handleMessage(event, context, callback){
    if(context)
        context.callbackWaitsForEmptyEventLoop = false;
    let message = event.Records[0].Sns.Message;

     try{
        message = JSON.parse(message);
    }catch(e){
        console.log('exception parsing ${e}')
    }
    console.log(message);
    let adapter = new smsAdapter(accountSid, authToken);
    adapter.sendMessage(message.to, fromNumber, message.message)
           .then(m=>{
                console.log(m);
                callback(null, m.sid);
           })
           .catch(e=>{
                console.log(e);
                callback(e);
           });   
}

exports.handler = handleMessage;