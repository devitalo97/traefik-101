import express, { Request, Response } from 'express';
import { io } from 'socket.io-client'

const app = express();
const port = 3001;

// Specify the server URL
const serverUrl = 'http://reverse-proxy:1111'; // Replace with your server URL
const socket = io(serverUrl);

// Event listener for successful connection
socket.on('connect', () => {
  console.log('CONNECTED TO SOCKET SERVER');
  // Send a message to the server
});

socket.on('error', (e) => {
  console.log('error', e);
});

// Event listener for disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});



// Parse incoming request bodies
app.use(express.json());

// Example endpoint
app.get('/', (req: Request, res: Response) => {
  socket.emit('api-message', 'data from api')
  res.send({ok: true});
});
  
// Start the server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

