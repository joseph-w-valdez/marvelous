import React from 'react';

const Character = ({ selectedCharacter, onMount }) => {

  onMount();

  if (!selectedCharacter) {
    selectedCharacter = {
      name: 'Iron Man',
      description: 'Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man.',
      thumbnailUrl: 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg',
      comicAppearances: '2660'
    };
  }
  const { name, description, thumbnailUrl, comicAppearances } = selectedCharacter;
  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl text-center mb-2'>{name}</h1>
      <div className='basis-full' />
      <div className="max-w-sm">
        <img
          src={thumbnailUrl}
          alt={name}
          className='border-18 border-red-border w-full object-contain'
          style={{ borderImage: 'linear-gradient(to bottom, #B13434, #7F1D1D) 1' }}
        />
      </div>
      <div className='max-w-5xl mx-5 my-6'>
        <p className='w-11/12'>Biography: {description}</p>
        <p className='mt-6 w-11/12'>Comic Appearances: {comicAppearances}</p>
        <div className='mt-6 w-11/12 cursor-pointer'><i className="fa-regular fa-star inline mr-3" /><p className="inline">Add to Favorites</p></div>
      </div>
    </div>
  );
};

export default Character;
