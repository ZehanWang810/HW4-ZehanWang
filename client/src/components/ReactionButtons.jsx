// src/components/ReactionButtons.jsx
import { useState } from 'react';

const reactions = ['👍', '❤️', '😂', '😮', '😢'];

export default function ReactionButtons({ onReaction }) {
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handleReaction = (reaction) => {
    setSelectedReaction(reaction);
    onReaction(reaction);
  };

  return (
    <div className="reactions">
      {reactions.map((reaction) => (
        <button
          key={reaction}
          onClick={() => handleReaction(reaction)}
          className={selectedReaction === reaction ? 'active' : ''}
        >
          {reaction}
        </button>
      ))}
    </div>
  );
}