import React from 'react';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-wrap justify-center mb-4 w-full lg:w-1/2 xl:w-1/3'>
      <div className="max-w-sm">
        <img
          src={character.imageUrl}
          alt={character.name}
          className='border-18 border-red-border w-full object-contain'
          style={{ borderImage: 'linear-gradient(to bottom, #B13434, #7F1D1D) 1' }}
        />
        <h1 className='text-2xl sm:text-3xl mt-2'>{character.name}</h1>
        <Button text='VIEW PROFILE' onClick={() => navigate('/character', { state: { character } })} />
      </div>
    </div>
  );
};

const NoResultsMessage = () => {
  return (
    <div className="w-full  text-center text-lg">
      No results found! Click <Link to='/' className='text-blue-500 underline'>here</Link> to search again!
    </div>
  );
};

const CharacterSearchResults = ({ onMount, characterResults }) => {
  console.log('characterResults', characterResults);
  onMount();

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-2xl sm:text-4xl mb-4 w-full text-center'>Search Results:</h1>
      {/* if there are no characterResults show a relevant message with a link to the search page */
      characterResults.length === 0 ? (
        <NoResultsMessage />
      ) : (
        // if there are characterResults, go through each item and render them using the CharacterCard component
        characterResults.map((character) => <CharacterCard key={character.id} character={character} />)
      )}
    </div>
  );
};

export default CharacterSearchResults;
