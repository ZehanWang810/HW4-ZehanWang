// src/components/Chat.jsx
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Message from './Message';

const socket = io('http://localhost:3000');

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentMessage.trim() && user.trim()) {
      socket.emit('chat message', {
        text: currentMessage,
        user: user
      });
      setCurrentMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h2>Socket.io Chat</h2>
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} text={msg.text} user={msg.user} timestamp={msg.timestamp} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Your name"
          required
        />
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}