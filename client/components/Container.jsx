import React, { useState } from 'react';
import Button from './Button';
import axios from 'axios';

const buttonText = 'SEARCH';

const Container = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const searchHandler = () => {
    const apiUrl = `http://localhost:3000/marvel/${inputValue}`;
    axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        setError('');
      })
      .catch(error => {
        console.error(error);
        setError('error');
      });
  };

  return (
    <div className='flex flex-wrap justify-center max-w-96 text-center'>
      {error && <h1 className='text-red-700 bold'>{error}</h1>}
      <p className='text-white font-Poppins w-full p-3'>
        Search for any Marvel Character to learn more about them!
      </p>
      <input
        type="text"
        placeholder='Iron Man'
        className='w-72 h-9 rounded px-3 mt-3'
        onChange={e => setInputValue(e.target.value)}
      />
      <div className='basis-full' />
      <Button text={buttonText} onClick={searchHandler}/>
    </div>
  );
};

export default Container;
