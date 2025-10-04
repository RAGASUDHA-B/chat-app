const socket = new WebSocket('ws://localhost:8080');
const username = `raga`; 
socket.onmessage = function (event) {
    const chatBox = document.getElementById('chat-box');
    const data = JSON.parse(event.data); 
    if (data.username === username) return;
    const message = document.createElement('div');
    message.classList.add('message', 'received'); 
    message.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight; 
};
function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    if (message !== '') {
        const chatBox = document.getElementById('chat-box');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message'); 
        messageDiv.innerHTML = `${message} <strong>:${username}</strong>`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; 
        socket.send(JSON.stringify({ username, message }));
        messageInput.value = '';
    }
}