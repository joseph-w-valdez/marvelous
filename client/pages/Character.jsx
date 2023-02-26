import React, { useEffect } from 'react';

const Character = ({ characterData, setSubNavBarText }) => {
  const { name, description, thumbnailUrl } = characterData;

  useEffect(() => {
    setSubNavBarText('CHARACTER');
  }, [setSubNavBarText]);

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl text-center mb-2'>{name}</h1>
      <div className='basis-full' />
      <div className="max-w-sm"><img src={thumbnailUrl} alt={name} className='border-18 border-gradient w-full object-contain'/></div>
      <p className='mt-6 w-11/12 text-center'>Biography: {description}</p>
    </div>
  );
};

export default Character;
