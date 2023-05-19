import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const SocketClient = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io('http://socket.localhost'); // Replace with your Socket.IO server URL

    socket.on("connect", () => {
      socket.emit('join', 'client-web-001')
    })

    socket.on('web-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.emit('leave', 'client-web-001')
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default SocketClient;
