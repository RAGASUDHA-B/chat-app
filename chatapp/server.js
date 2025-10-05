const WebSocket = require('ws');
const readline = require('readline');
const server = new WebSocket.Server({ port: 8080 });
const clients = [];
server.on('connection', (socket) => {
    console.log('Client connected');
    clients.push(socket); 
    socket.on('message', (data) => {
        const message = JSON.parse(data);
        console.log(`Received from ${message.username}: ${message.message}`);
        broadcastMessage(message);
    });
    socket.on('close', () => {
        console.log('Client disconnected');
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
});
function broadcastMessage(message) {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.on('line', (input) => {
    console.log(`Sending message from terminal: ${input}`);
    broadcastMessage({ username: 'JK', message: input });
});

console.log('WebSocket server is running on ws://localhost:8080');