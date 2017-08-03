
https://cloudncode.blog/2017/03/02/best-practices-aws-lambda-function/

http://blog.rowanudell.com/database-connections-in-lambda/



API Gateway
If a caller submits 10,000 requests in a one second period evenly (for example, 10 requests every millisecond), 
API Gateway processes all requests without dropping any.

If the caller sends 10,000 requests in the first millisecond, 
API Gateway serves 5,000 of those requests and throttles the rest in the one-second period.

If the caller submits 5,000 requests in the first millisecond and then evenly spreads another 5,000 requests 
through the remaining 999 milliseconds (for example, about 5 requests every millisecond), 
API Gateway processes all 10,000 requests in the one-second period without returning 
429 Too Many Requests error responses.

If the caller submits 5,000 requests in the first millisecond and waits until the 101st millisecond to submit another 
5,000 requests, API Gateway processes 6,000 requests and throttles the rest in the one-second period. 
This is because at the rate of 10,000 rps, API Gateway has served 1,000 requests after the first 100 milliseconds 
and thus emptied the bucket by the same amount. Of the next spike of 5,000 requests, 1,000 fill the bucket 
and are queued to be processed. The other 4,000 exceed the bucket capacity and are discarded.

If the caller submits 5,000 requests in the first millisecond, submits 1,000 requests at the 101st millisecond, 
and then evenly spreads another 4,000 requests through the remaining 899 milliseconds, API Gateway processes 
all 10,000 requests in the one-second period without throttling.

Scope:

Any declarations in your Lambda function code (outside the handler code, see Programming Model)
remains initialised, providing additional optimization when the function is invoked again. 
For example, if your Lambda function establishes a database connection, instead of reestablishing the connection,
the original connection is used in subsequent invocations. You can add logic in your code to check 
if a connection already exists before creating one.

Deciding where you variables should be instantiated is a balancing act; 
The more you put outside your function handler the quicker your warm execution will be, 
but the slower your cold execution will be (see below for more on warm and cold functions). 
The more you put inside your function the simpler your run-time environment will be to 
reason about (in the event of bugs).

