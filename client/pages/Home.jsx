import React, { useEffect } from 'react';
import CharacterSearch from '../components/CharacterSearch';

export default function Home({ setCharacterData, setSubNavBarText }) {

  const subNavbarText = 'SEARCH';

  useEffect(() => {
    setSubNavBarText(subNavbarText);
  }, [subNavbarText, setSubNavBarText]);

  return (
    <div>
      <CharacterSearch setCharacterData={setCharacterData}/>
    </div>
  );
}
