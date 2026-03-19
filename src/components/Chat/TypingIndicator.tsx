import React from 'react';
import './TypingIndicator.css';

const TypingIndicator: React.FC = () => {
  return (
    <div className="message-wrapper bot-wrapper">
      <div className="avatar bot-avatar">
        🪴
      </div>
      <div className="message-bubble bot-message typing-bubble">
        <div className="typing-indicator">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
