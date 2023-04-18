import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const CharacterCard = ({ character, onClick }) => {
  const navigate = useNavigate();
  
  const handleViewProfileClick = () => {
    onClick(character);
    navigate('/character', { state: { character } });
  };

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
        <Button text='VIEW PROFILE' onClick={handleViewProfileClick} />
      </div>
    </div>
  );
};

export default CharacterCard;
