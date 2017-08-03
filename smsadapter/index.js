const twilio = require('twilio');

let smsAdapter = function(accountSid, authToken){
    this.accountSid = accountSid;
    this.authToken = authToken;

    this.client = twilio(accountSid, authToken);

    this.sendMessage = function(to, from, message){
        console.log(`sending message - ${message} from ${from} to ${to}`);
        return this.client.messages.create({
            to: to,
            from: from,
            body: message
        });
    }
}

module.exports = smsAdapter;