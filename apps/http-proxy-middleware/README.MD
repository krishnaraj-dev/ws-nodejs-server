/\*\*

- Example:
- Open http://localhost:3000 in WebSocket compatible browser.
- In browser console:
- 1.  `const socket = new WebSocket('ws://localhost:3000');` // create new WebSocket
- 2.  `socket.onmessage = function (msg) {console.log(msg)};` // listen to socket messages
- 3.  `socket.send('hello world');` // send message
- > {data: "hello world"} // server should echo back your message.
  > \*\*/
