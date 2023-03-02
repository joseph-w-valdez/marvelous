import React from 'react';
import CharacterSearch from '../components/CharacterSearch';

export default function Home({ onSearch, onMount }) {

  onMount();

  return (
    <div>
      <CharacterSearch onSearch={onSearch} />
    </div>
  );
}
