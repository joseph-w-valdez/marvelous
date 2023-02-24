import React, { useState } from 'react';
import Button from './Button';
import axios from 'axios';

const buttonText = 'SEARCH';

const Container = () => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const searchHandler = event => {
    event.preventDefault();
    const apiUrl = `http://localhost:3000/marvel/${inputValue}`;
    // const apiUrl = `${process.env.API_ENDPOINT}${inputValue}`; more appropriate method; investigate after end of project
    axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        setErrorMessage(undefined);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          console.error(error);
          setErrorMessage(`Could not find character with name '${inputValue}'`);
        } else {
          console.error(console.error);
          setErrorMessage('An error occurred while fetching data. Please try again later.');
        }
      });
  };

  return (
    <div className='flex flex-wrap justify-center max-w-96 text-center'>
      {errorMessage && <h1 className='text-red-700 bold'>{errorMessage}</h1>}
      <form onSubmit={searchHandler}>
        <p className='text-white font-Poppins w-full p-3'>
          Search for any Marvel Character to learn more about them!
        </p>
        <input
          type="text"
          placeholder='Iron Man'
          className='w-72 h-9 rounded px-3 mt-3'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <div className='basis-full' />
        <Button text={buttonText} type="submit" />
      </form>
    </div>
  );
};

export default Container;
