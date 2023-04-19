import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';

export const useInput = (initialValue, handleSearch, setLoading) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedHandleInputValueChange = useMemo(() => {
    return debounce(async (inputValue) => {
      if (inputValue !== '') {
        const autoFillApiUrl = `/marvel/character/${inputValue}`;
        try {
          const response = await axios.get(autoFillApiUrl);
          setSuggestions(response.data);
        } catch (error) {
          console.error(error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);
  }, []);

  const handleInputValueChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    setShowSuggestions(true);

    if (inputValue !== '') {
      setLoading(true);
      debouncedHandleInputValueChange.cancel();
      debouncedHandleInputValueChange(inputValue);
    } else {
      setLoading(false);
      debouncedHandleInputValueChange.cancel();
      setSuggestions([]);
    }
  };

  return {
    inputValue,
    setInputValue,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    handleInputValueChange,
  };
};
