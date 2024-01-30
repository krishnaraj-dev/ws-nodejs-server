import { useState, useEffect } from 'react';

const WebSocketPage = () => {
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const port = 3001;


    useEffect(() => {
        // Create a WebSocket connection when the component mounts
        const socket = new WebSocket(`ws://localhost:${port}`);
        setWs(socket);

        // Event listener for connection open
        socket.addEventListener('open', () => {
            console.log('Connected to server');
        });

        // Event listener for receiving messages
        socket.addEventListener('message', (event) => {
            console.log(`Received from server: ${event.data}`);
            setReceivedMessages((prevMessages) => [...prevMessages, event.data]);
        });

        // Event listener for connection close
        socket.addEventListener('close', () => {
            console.log('Connection closed');
        });

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const handleSendMessage = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>WebSocket Example with Next.js</h1>

            <div>
                <label htmlFor="messageInput">Message:</label>
                <input
                    type="text"
                    id="messageInput"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>

            <div>
                <h2>Received Messages:</h2>
                <ul>
                    {receivedMessages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WebSocketPage;
