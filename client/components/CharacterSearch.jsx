import React, { useState } from 'react';
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ScrollToTopOnPageChange } from '../utils/ScrollToTop';
import { useUser } from '../contexts/UserContext';
import debounce from 'lodash/debounce';


const buttonText = 'SEARCH';

const CharacterSearch = ({ onSearch }) => {
  ScrollToTopOnPageChange();
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [autoFillSuggestions, setAutoFillSuggestions] = useState([]);
  const navigate = useNavigate();
  const { loading, setLoading } = useUser();

  const searchHandler = async (event) => {
    event.preventDefault();
    const apiUrl = `/marvel/character/${inputValue}`;
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      onSearch(response.data);
      setErrorMessage(undefined);
      navigate('/characterSearchResults');
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

  const handleInputValueChange = async (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    if (inputValue !== '') {
      const autoFillApiUrl = `/marvel/character/${inputValue}`;
      try {
        setLoading(true);
        const response = await axios.get(autoFillApiUrl);
        setAutoFillSuggestions(response.data);
      } catch (error) {
        console.error(error);
        setAutoFillSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setAutoFillSuggestions([]);
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
        <div className="input-wrapper">
          <input
            type="text"
            placeholder='Iron Man'
            className='w-72 h-9 rounded px-3 mt-3'
            value={inputValue}
            onChange={handleInputValueChange}
            required
          />
          {autoFillSuggestions.length > 0
            ? (
              <ul className="autoFillSuggestions">
                {autoFillSuggestions.map((suggestion) => (
                  <li key={suggestion.name}>
                    <button
                    onClick={() => setInputValue(suggestion.name)}
                    className="suggestion bg-white border border-black hover:bg-blue-100 w-72"
                  >
                      {suggestion.name}
                    </button>
                  </li>
                ))}
              </ul>
              )
            : inputValue !== '' && !loading
              ? (
                <ul>
                  <li>
                    <span className="suggestion bg-white border border-black w-72 inline-block">
                      No results found
                    </span>
                  </li>
                </ul>
                )
              : null}
        </div>
        <div className='basis-full' />
        <Button text={buttonText} type="submit" />
      </form>
    </div>
  );
};

export default CharacterSearch;
