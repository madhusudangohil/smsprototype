module.exports = {
  profile: 'default', // load your AWS credentials from a custom profile
  region: 'us-west-2', //the region of your Lambda function
  handler: 'index.handler', //the name of the handler function: index because the main file is index.js
  role: 'arn:aws:iam::459375513878:role/sms_prototype', // the Lambda role
  functionName: 'agent-assignment-handler', //name
  timeout: 30,
  memorySize: 128,
  publish: true, // this creates a new version of your Lambda function every time you update it
  runtime: 'nodejs6.10', // for node 10, otherwise use 'nodejs4.3'  
  vpc: { // optional
    SecurityGroupIds: ['sg-1208bb68'],
    SubnetIds:['subnet-acd7d0e5','subnet-5ee46005']
  },
  eventSource: {
    EventSourceArn: 'arn:aws:sns:us-west-2:459375513878:Message-Queued',
    BatchSize: 200,
    StartingPosition: "TRIM_HORIZON"
  }
}

//see other options here: https://github.com/ThoughtWorksStudios/node-aws-lambda