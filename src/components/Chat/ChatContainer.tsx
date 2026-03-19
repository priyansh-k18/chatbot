import React, { useState, useRef, useEffect } from 'react';
import './ChatContainer.css';
import EmptyState from './EmptyState';
import InputArea from './InputArea';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

import { streamGeminiResponse } from '../../services/geminiService';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    const botMsgId = (Date.now() + 1).toString();
    
    // Add an empty assistant message to stream into
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: botMsgId, role: 'assistant', content: '' }]);
      
      streamGeminiResponse(
        text,
        (chunk) => {
          setMessages(prev => prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, content: msg.content + chunk }
              : msg
          ));
        },
        () => {
          // completion
        },
        (errorMsg) => {
          // If an error occurs, show it in the chat bubble
          setMessages(prev => prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, content: errorMsg }
              : msg
          ));
        }
      );
    }, 1200); // Initial 1.2s delay to simulate 'thinking'
  };

  return (
    <div className="chat-wrapper">
      <header className="chat-header">
        <div className="header-logo">
          <span className="logo-icon">🌿</span>
          <h1>Flora</h1>
        </div>
        <p className="header-subtitle">Your AI Botanist Buddy</p>
      </header>

      <div className="chat-scroll-area">
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSendMessage} />
        ) : (
          <div className="messages-list">
            {messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="chat-footer">
        <InputArea onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatContainer;
