import React from 'react';

const Character = ({ characterData }) => {
  console.log(characterData);
  const { name, description, thumbnailUrl } = characterData;
  console.log('thumbnail value :  ', thumbnailUrl);

  return (
    <div className='text-white m-7 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl text-center mb-2'>{name}</h1>
      <div className='basis-full' />
      <div className="max-w-sm"><img src={thumbnailUrl} alt={name} className='border-18 border-gradient w-full object-contain'/></div>
      <p className='mt-6 w-11/12'>Biography: {description}</p>
    </div>
  );
};

export default Character;
