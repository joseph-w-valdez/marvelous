import React from 'react';
import SubNavbar from '../components/Sub-Navbar';
import CharacterSearch from '../components/CharacterSearch';

export default function Home({ setCharacterData }) {
  return (
    <div>
      <SubNavbar />
      <CharacterSearch setCharacterData={setCharacterData}/>
    </div>
  );
}
