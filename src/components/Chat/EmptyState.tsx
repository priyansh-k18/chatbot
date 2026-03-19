import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  onSuggestionClick: (text: string) => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    "How do I save an overwatered Monstera?",
    "Best indoor plants for low sunlight?",
    "Why are my Pothos leaves turning yellow?",
    "How often should I fertilize my orchids?"
  ];

  return (
    <div className="empty-state">
      <div className="empty-state-icon">🪴</div>
      <h2>Welcome to Flora</h2>
      <p>Your personal AI Botanist is here to help your plants thrive. Ask me anything about plant care, propagation, or diagnosis!</p>
      
      <div className="suggestions-grid">
        {suggestions.map((suggestion, index) => (
          <button 
            key={index}
            className="suggestion-btn"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
