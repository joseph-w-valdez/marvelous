import React, { useState } from 'react';
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ScrollToTopOnPageChange } from '../utils/ScrollToTop';
import { useUser } from '../contexts/UserContext';

const buttonText = 'SEARCH';

const CharacterSearch = ({ onSearch }) => {
  ScrollToTopOnPageChange();
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { setLoading } = useUser();

  const searchHandler = async (event) => {
    event.preventDefault();
    const apiUrl = `localhost:3000/marvel/character/${inputValue}`;
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      onSearch(response.data);
      setErrorMessage(undefined);
      navigate('/character');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error(error);
        setErrorMessage(`Could not find character with name '${inputValue}'`);
      } else {
        console.error(error);
        setErrorMessage('An error occurred while fetching data. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-wrap justify-center max-w-96 text-center'>
      {errorMessage && <h1 className='text-red-700 bold'>{errorMessage}</h1>}
      <div className='basis-full' />
      <form onSubmit={searchHandler}>
        <p className='text-white font-Poppins w-full p-3'>
          Search for any Marvel Character to learn more about them!
        </p>
        <input
          type="text"
          placeholder='Iron Man'
          className='w-72 h-9 rounded px-3 mt-3'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <div className='basis-full' />
        <Button text={buttonText} type="submit" />
      </form>
    </div>
  );
};

export default CharacterSearch;
