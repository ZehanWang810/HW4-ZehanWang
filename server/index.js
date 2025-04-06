// server/index.js
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite default port
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', {
      text: msg.text,
      user: msg.user,
      timestamp: new Date().toISOString()
    });
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});