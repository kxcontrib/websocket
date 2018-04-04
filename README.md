The code in this repo is to be used in conjuction with the kdb+ and WebSockets Whitepaper 

Appendix A
----------
Start a q process and set it to listen on port 5001
Set the .z.ws message handler using the following :  .z.ws:{neg[.z.w] -8! @[value;x;{`$ "'",x}]}
Open SimpleDemo.html in a web browser to view the web console example

Appendix A
----------
Start a q process that loads in the pubsub.q script
Start a second q process that loads in the fh.q script
Open websockets.html in a web browser to show tables updating in real time via a websocket connection
