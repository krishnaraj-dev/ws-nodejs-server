const { WebSocket } = require("ws")

const port = 3001
// Create a WebSocket server on port 3000
const wss = new WebSocket.Server({ port });

// Event listener for connection
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Event listener for receiving messages
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    // Echo the message back to the client
    ws.send(`Server: ${message}`);
  });

  // Event listener for connection close
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log(`WebSocket server is listening on port ${port}`);
