import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket: Socket) => {
  console.log('NEW CONNECTION');

  socket.on('join', async (message) => {
    console.info('JOINED WITH: ', message)
    socket.join(message)
  })

  socket.on('leave', async (message) => {
    console.info('LEAVED WITH: ', message)
    socket.leave(message)
  })
  
  socket.on('api-message', (data: string) => {
    // io.sockets.emit('web-message', data)
    io.emit('web-message', data); // Broadcast the message to all connected clients
  });

  socket.on('iot-message', (data: string) => {
    // io.sockets.emit('web-message', data)
    io.emit('web-message', data); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('DISCONNECTED: ', socket.id);
  });
});

const port = 3003;
httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
