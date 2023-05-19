import * as net from 'net';
import { io } from 'socket.io-client';
// Specify the server URL
const serverUrl = 'http://reverse-proxy:1111'; // Replace with your server URL
const ioClient = io(serverUrl);

// Event listener for successful connection
ioClient.on('connect', () => {
  console.log('TCP SERVER: CONNECTED TO SOCKET SERVER');
  // Send a message to the server
});

ioClient.on('error', (e) => {
  console.log('TCP SERVER: EEROR SOCKET SERVER', e);
});

// Event listener for disconnection
ioClient.on('disconnect', () => {
  console.log('TCP SERVER: DISCONNECTED FROM SOCKET SERVER');
});

// Create a TCP server
const server = net.createServer((socket) => {
  // Connection event
  console.log('TCP SERVER: CLIENT CONNECTED');

  // Handle data received from the client
  socket.on('data', (data) => {
    const message = data.toString().trim();
    ioClient.emit('iot-message', message)
    console.log(`TCP SERVER DATA: ${message}`);
  });

  // Handle client connection termination
  socket.on('end', () => {
    console.log('TCP SERVER: CLIENT DISCONNECTED');
  });
});

// Start the server and listen on a specific port
const PORT = 3002;
server.listen(PORT, () => {
  console.log(`TCP SERVER: LISTENING ON ${PORT}`);
  setTimeout(() => require('./client'), 10000)
});


server.on('error', (e) => {
  console.log(`TCP SERVER ERROR: ${e}`);
});


