The code to accompany the kdb+ and WebSockets Whitepaper 

Appendix A
----------

1.  Start a q process and set it to listen on port 5001.
2.  Set the `.z.ws` message handler using ``.z.ws:{neg[.z.w] -8! @[value;x;{`$ "'",x}]}``.
3.  Open `SimpleDemo.html` in a web browser to view the web console example.

Appendix B
----------

1.  Start a q process that loads the `pubsub.q` script.
2.  Start a second q process that loads the `fh.q` script.
3.  Open `websockets.html` in a web browser to show tables updating in real time via a websocket connection.
