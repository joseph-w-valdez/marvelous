import React from 'react';

const AutoFillSuggestions = ({ suggestions, highlightedIndex, onSuggestionClick }) => (
  <ul className="autoFillSuggestions">
    {suggestions.map((suggestion, index) => (
      <li key={suggestion.name}>
        <button
          onClick={() => onSuggestionClick(suggestion.name)}
          className={`suggestion bg-white border border-black hover:bg-blue-100 w-72${highlightedIndex === index ? ' bg-blue-100' : ''}`}
        >
          {suggestion.name}
        </button>
      </li>
    ))}
  </ul>
);

export default AutoFillSuggestions;
