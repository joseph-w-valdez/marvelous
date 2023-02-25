import React from 'react';

const Character = ({ characterData }) => {
  console.log(characterData);
  const { name, description, thumbnailUrl } = characterData;
  console.log('thumbnail value :  ', thumbnailUrl);

  return (
    <div className='text-white m-7 font-Poppins'>
      <h1 className='text-4xl text-center mb-2'>{name}</h1>
      <img src={thumbnailUrl} alt={name} className='border-18 border-gradient'/>
      <p className='mt-6'>Biography: {description}</p>
    </div>
  );
};

export default Character;
