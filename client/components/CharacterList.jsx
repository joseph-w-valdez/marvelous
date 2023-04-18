import React from 'react';
import { Link } from 'react-router-dom';
import CharacterCard from './CharacterCard';

const CharacterList = ({ characters, onClick }) => {
  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      {characters.length === 0
        ? (
          <div className="w-full  text-center text-lg">
            No search results found! Click <Link to='/' className='text-blue-500 underline'>here</Link> to search for characters again!
          </div>
          )
        : (
            characters.map((character) => (
              <CharacterCard key={character.id} character={character} onClick={onClick} />
            ))
          )}
    </div>
  );
};

export default CharacterList;
