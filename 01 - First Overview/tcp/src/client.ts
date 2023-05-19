import * as net from 'net';

const PORT = 1234;
const HOST = 'reverse-proxy';
const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log(`TCP CLIENT: CONNECTED AT ${HOST}:${PORT}`);  
});

// Handle data received from the server
client.on('data', (data) => {
  const receivedMessage = data.toString().trim();
  console.log(`TCP CLIENT DATA: ${receivedMessage}`);
});

// Handle server connection termination
client.on('end', () => {
  console.log(`TCP CLIENT: DISCONNECTED FROM ${HOST}:${PORT}`);
});

// Handle connection errors
client.on('error', (error) => {
  console.error('TCP CLIENT ERROR: ', error);
});

function sendMessages() {
  const message = 'data from device';
  client.write(message);
}

// Send messages every 5 seconds
setInterval(sendMessages, 5000);
