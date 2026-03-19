import React from 'react';
import './MessageBubble.css';
import ReactMarkdown from 'react-markdown';
import type { Message } from './ChatContainer';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`message-wrapper ${isUser ? 'user-wrapper' : 'bot-wrapper'}`}>
      {!isUser && (
        <div className="avatar bot-avatar">
          🪴
        </div>
      )}
      
      <div className={`message-bubble ${isUser ? 'user-message' : 'bot-message'}`}>
        <div className="message-content markdown-content">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        <div className="message-time">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <div className="avatar user-avatar">
          👤
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
