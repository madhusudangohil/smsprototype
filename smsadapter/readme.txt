https://support.twilio.com/hc/en-us/articles/223183648-Sending-and-Receiving-Limitations-on-Calls-and-SMS-Messages


Inbound SMS

Twilio places no limitation on the rate at which a number can receive SMS messages. 
Twilio will make an HTTP request to the request URL for each message received at your Twilio number. 
Therefore, please make sure your server is capable of handling the load if you are expecting a large amount of 
concurrent inbound traffic.


Outgoing SMS on Long Codes

Based on the destination you’re reaching, your messages will be processed at different rates.
If your application is making requests faster than the rate mentioned below, your messages will be placed in a queue 
and processed accordingly.


From	                                    To	                            Messages per Second
Twilio SMS-capable local or mobile number	US and Canada	                1
Twilio US toll free number	                US and Canada                   3  
Any Twilio SMS-capable number or
 Alphanumeric sender ID	                    Other international countries	10
Twilio short code	                        US, Canada or UK	            100
(contact sales for more)