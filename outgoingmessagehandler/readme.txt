#aws lambda delete-function --function-name arn:aws:lambda:us-west-2:459375513878:function:outgoingmessagehandler

#aws lambda create-function --function-name   outgoingmessagehandler  --zip-file fileb://outgoingmessagehandler.zip --role arn:aws:iam::459375513878:role/sms_prototype --handler index.handler --runtime nodejs6.10 --region us-west-2 --vpc-config SubnetIds=[subnet-acd7d0e5,subnet-5ee46005],
SecurityGroupIds=[sg-1208bb68] --environment Variables="{fromNumber=13098086205,authToken=77ad6a3019444478f17689ce988aca58,accountSid=AC119ac6bc1668aaaaa2941d0a72a1b4b1}"


#aws sns subscribe --topic-arn arn:aws:sns:us-west-2:459375513878:Agent-Response --protocol lambda --notification-endpoint arn:aws:lambda:us-west-2:459375513878:function:outgoingmessagehandler