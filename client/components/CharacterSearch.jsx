import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputWrapperRef = useRef(null);
  const [highlightedSuggestionIndex, setHighlightedSuggestionIndex] = useState(-1);

  // for handling direct search submissions
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
  // for handling changes to the search bar
  const handleInputValueChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    setShowSuggestions(true);

    if (inputValue !== '') {
      setLoading(true);
      debouncedHandleInputValueChange.cancel(); // Cancel the previous debounced calls
      debouncedHandleInputValueChange(inputValue);
    } else {
      setLoading(false);
      debouncedHandleInputValueChange.cancel();
      setAutoFillSuggestions([]); // Clear suggestions when input is empty
    }
  };
  // for limiting how frequent the autofill suggester function runs per second
  const debouncedHandleInputValueChange = useMemo(() => {
    return debounce(async (inputValue) => {
      if (inputValue !== '') {
        const autoFillApiUrl = `/marvel/character/${inputValue}`;
        try {
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
    }, 500);
  }, []);
  // for handling navigation between the input and populated autofill suggestions
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedSuggestionIndex((prevIndex) =>
        prevIndex < autoFillSuggestions.length - 1 ? prevIndex + 1 : -1
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedSuggestionIndex((prevIndex) =>
        prevIndex > -1 ? prevIndex - 1 : autoFillSuggestions.length - 1
      );
    } else if (event.key === 'Enter' && highlightedSuggestionIndex >= 0) {
      event.preventDefault();
      handleSuggestionClick(autoFillSuggestions[highlightedSuggestionIndex].name);
    }
  };
  // for directly going to that specfic character result
  const handleSuggestionClick = async (suggestionName) => {
    setInputValue(suggestionName);
    setShowSuggestions(false);
    setHighlightedSuggestionIndex(-1);
    const autoFillApiUrl = `/marvel/character/${suggestionName}?exactMatch=true`;
    try {
      const response = await axios.get(autoFillApiUrl);
      if (response.data.length === 1) {
        navigate('/character', { state: { character: response.data[0] } });
      }
    } catch (error) {
      console.error(error);
    }
  };
  // for hiding the suggestions if the user clicks anywhere but the suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputWrapperRef.current && !inputWrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputWrapperRef]);

  return (
    <div className='flex flex-wrap justify-center max-w-96 text-center'>
      {errorMessage && <h1 className='text-red-700 bold'>{errorMessage}</h1>}
      <div className='basis-full' />
      <form onSubmit={searchHandler}>
        <p className='text-white font-Poppins w-full p-3'>
          Search for any Marvel Character to learn more about them!
        </p>
        <div className="input-wrapper" ref={inputWrapperRef}>
          <input
            type="text"
            placeholder='Iron Man'
            className='w-72 h-9 rounded px-3 mt-3'
            value={inputValue}
            onChange={handleInputValueChange}
            onKeyDown={handleKeyDown}
            required
          />
          {showSuggestions && autoFillSuggestions.length > 0
            ? (
              <ul className="autoFillSuggestions">
                {autoFillSuggestions.map((suggestion, index) => (
                  <li key={suggestion.name}>
                    <button
            onClick={() => handleSuggestionClick(suggestion.name)}
            className={`suggestion bg-white border border-black hover:bg-blue-100 w-72${highlightedSuggestionIndex === index ? ' bg-blue-100' : ''}`}
          >
                      {suggestion.name}
                    </button>
                  </li>
                ))}
              </ul>
              )
            : inputValue !== '' && !loading && showSuggestions
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
