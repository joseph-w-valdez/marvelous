import React from 'react';
import Button from './Button';

const buttonText = 'SEARCH';

const Container = () => {
  return (
    <div className='flex flex-wrap justify-center max-w-96 text-center'>
      <p className='text-white font-Poppins w-full p-3'>
        Search for any Marvel Character to learn more about them!
      </p>
      <input type="text" placeholder='Iron Man' className='w-72 h-9 rounded px-3 mt-3'/>
      <div className='basis-full' />
      <Button text={buttonText}/>
    </div>
  );
};

export default Container;
