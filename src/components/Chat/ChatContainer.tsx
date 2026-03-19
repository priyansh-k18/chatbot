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
  const [isDark, setIsDark] = useState(() => document.documentElement.getAttribute('data-theme') === 'dark');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

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
    
    streamGeminiResponse(
      text,
      (chunk) => {
        setMessages(prev => {
          // If this is the first chunk, turn off the typing indicator and add the new message
          if (!prev.some(msg => msg.id === botMsgId)) {
            setIsTyping(false);
            return [...prev, { id: botMsgId, role: 'assistant', content: chunk }];
          }
          // Otherwise, append the chunk to the existing message
          return prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, content: msg.content + chunk }
              : msg
          );
        });
      },
      () => {
        setIsTyping(false);
      },
      (errorMsg) => {
        setIsTyping(false);
        setMessages(prev => {
          if (!prev.some(msg => msg.id === botMsgId)) {
            return [...prev, { id: botMsgId, role: 'assistant', content: errorMsg }];
          }
          return prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, content: errorMsg }
              : msg
          );
        });
      }
    );
  };

  return (
    <div className="chat-wrapper">
      <header className="chat-header">
        <div className="header-logo">
          <span className="logo-icon">🌿</span>
          <h1>Flora</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <p className="header-subtitle" style={{ margin: 0 }}>Your AI Botanist Buddy</p>
          <button 
            onClick={toggleTheme} 
            aria-label="Toggle Dark Mode"
            style={{ 
              background: 'transparent', 
              border: 'none', 
              fontSize: '1.25rem', 
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
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
