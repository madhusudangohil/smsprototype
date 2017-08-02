var params = {
  botAlias: process.env.botAlias,//'mobilePlanBot', /* required */
  botName: process.env.botName, /* required */
  contentType: 'text/plain; charset=utf-8', /* required */  
  userId: 'nodeuser', /* required */
  accept: 'text/plain; charset=utf-8'
};

module.exports = params;