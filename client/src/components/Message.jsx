// src/components/Message.jsx
import { useState } from 'react';
import ReactionButtons from './ReactionButtons';

export default function Message({ text, user, timestamp }) {
  const [reaction, setReaction] = useState(null);

  return (
    <div className="message">
      <div className="message-header">
        <span className="user">{user}</span>
        <span className="timestamp">
          {new Date(timestamp).toLocaleTimeString()}
        </span>
      </div>
      <div className="message-text">{text}</div>
      {reaction && <div className="message-reaction">{reaction}</div>}
      <ReactionButtons onReaction={(r) => setReaction(r)} />
    </div>
  );
}