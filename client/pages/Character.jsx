import React from 'react';

const Character = ({ characterData, onMount }) => {
  const { name, description, thumbnailUrl, comicAppearances } = characterData;
  onMount();

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
