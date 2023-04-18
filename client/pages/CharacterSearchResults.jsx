import React from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';

const NoResultsMessage = () => {
  return (
    <div className="w-full  text-center text-lg">
      No results found! Click <Link to='/' className='text-blue-500 underline'>here</Link> to search again!
    </div>
  );
};

const CharacterSearchResults = ({ onMount, characterResults }) => {
  onMount();
  const navigate = useNavigate();

  const handleViewProfileClick = (character) => {
    navigate('/character', { state: { character } });
  };

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      {/* if there are no characterResults show a relevant message with a link to the search page */
      // eslint-disable-next-line multiline-ternary
      characterResults.length === 0 ? (
        <NoResultsMessage />
      ) : (
        // if there are characterResults, go through each item and render them using the CharacterCard component
        characterResults.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onClick={handleViewProfileClick}
          />
        ))
      )}
    </div>
  );
};

export default CharacterSearchResults;
