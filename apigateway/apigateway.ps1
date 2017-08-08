Write-Output "Removing zip file"
Remove-Item E:\app-channels\app-channels-sms\prototype\SMSPrototype1\SMSPrototype\lambdas\inboundMessageHandler.zip
Write-Output "Removed zip file"

Write-Output "Creating zip"
Compress-Archive -LiteralPath E:\app-channels\app-channels-sms\prototype\SMSPrototype1\SMSPrototype\lambdas\inboundMessageHandler.js `
-DestinationPath E:\app-channels\app-channels-sms\prototype\SMSPrototype1\SMSPrototype\lambdas\inboundMessageHandler.zip
Write-Output "Created zip"

Write-Output "Deploying Lambda"

$region = "us-west-2"
$accountId = "123456789"
$resourceName = "helloWorld"
$lambdaFunctionName = "channels-inbound-message-handler"
$profile = "individual"

$lambdaArn = "arn:aws:lambda:$($region):$($accountId):function:$($lambdaFunctionName)"


aws lambda delete-function `
--function-name $lambdaArn `
--region $region `
--profile $profile

aws lambda create-function --function-name   channels-inbound-message-handler  `
--zip-file fileb://../lambdas/inboundMessageHandler.zip `
--role arn:aws:iam::123456789:role/sms_prototype --handler inboundMessageHandler.handler `
--runtime nodejs6.10 --region us-west-2 `
--profile individual
Write-Output "Lambda Deployment Done"

Write-Output "Creating Api"
$restApi = aws apigateway create-rest-api --name helloWorldApi --description 'test cli for api creation' `
--profile individual --region us-west-2 | ConvertFrom-Json
Write-Output "Rest Api Created with id $($restApi.id)"

Write-Output "Getting resource for newly created Api"
$parent = aws apigateway get-resources --rest-api-id $restApi.id --profile individual --region us-west-2 | ConvertFrom-Json
Write-Output "Parent Id is  $($parent.items[0].id)"

Write-Output "Create Resource"
$resource = aws apigateway create-resource  --rest-api-id $restApi.id `
--parent-id $parent.items[0].id --path-part 'helloWorld' --profile individual --region us-west-2 | ConvertFrom-Json
Write-Output $resource
Write-Output "Resource Created $($resource.id)"

Write-Output "Registering Put Method"
aws apigateway put-method --rest-api-id $restApi.id --resource-id $resource.id `
--http-method POST --authorization-type NONE --region us-west-2 --profile individual
Write-Output "Put Method Done"

Write-Output "Registering Put Integration"
aws apigateway put-integration --rest-api-id $restApi.id --resource-id $resource.id `
--http-method POST --type AWS --integration-http-method POST `
--uri arn:aws:apigateway:us-west-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-west-2:123456789:function:channels-inbound-message-handler/invocations `
--request-templates '{\"application/x-www-form-urlencoded\":\""#set($httpPost=$input.path(\\\"$\\\").split(\\\"&\\\"))\r\n{#foreach($kvPair\u0020in\u0020$httpPost)\r\n#set($kvTokenised=$kvPair.split(\\\"=\\\"))\r\n#if($kvTokenised.size()>1)\r\n\\\"$kvTokenised[0]\\\":\\\"$kvTokenised[1]\u0020\\\"\r\n#if($foreach.hasNext),#end\u0020\r\n#else\u0020\\\"$kvTokenised[0]\\\":\\\"\\\"\r\n#if($foreach.hasNext),#end\r\n#end\r\n#end}"\"}' `
--profile individual `
--region us-west-2
Write-Output "Registered Put Integration"


$stage = "prod"
$method = "POST"
$sourceArn = "arn:aws:execute-api:$($region):$($accountId):$($restApi.id)/$($stage)/$($method)/$($resourceName)"

aws lambda add-permission --function-name channels-inbound-message-handler `
--statement-id apigateway-helloworld-4 `
--action lambda:InvokeFunction `
--principal 'apigateway.amazonaws.com' `
--source-arn $sourceArn `
--region us-west-2 --profile individual

Write-Output "Deploying Api"
aws apigateway  create-deployment --rest-api-id $restApi.id `
--stage-name 'prod' --profile individual --region us-west-2
Write-Output "Api Deployed"

Write-Output "Delete Resource  $($restApi.id)"
#aws apigateway delete-rest-api --rest-api-id $restApi.id --profile individual
Write-Output "Resource Deleted"

