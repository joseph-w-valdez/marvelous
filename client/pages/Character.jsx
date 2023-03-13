import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '../contexts/UserContext';
import axiosPost from '../utils/AxiosPost';
import { useLocation, Link } from 'react-router-dom';
import { ScrollToTopOnPageChange } from '../utils/ScrollToTop';

const Character = ({ selectedCharacter }) => {
  const { user, setUser } = useUser();
  const location = useLocation();

  // Scroll to the top of the page on mount and when the location changes
  ScrollToTopOnPageChange();

  // If there's a character in the location state, use it as the selected character
  if (location && location.state && location.state.character) {
    selectedCharacter = location.state.character;
  }

  // If there's no selected character, use a default one
  if (!selectedCharacter) {
    selectedCharacter = {
      name: 'Iron Man',
      description: 'Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man.',
      imageUrl: 'https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg',
      comicAppearances: '2660'
    };
  }

  const { name, description, imageUrl, comicAppearances } = selectedCharacter;

  const [isFavorited, setIsFavorited] = useState(null);

  // Fetch the user's favorites for the selected character on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      const apiUrl = '/marvel/toggleFavorites';
      try {
        const response = await axiosPost(apiUrl, {
          selectedCharacter,
          user,
          action: 'fetch'
        });
        const characterId = response.data.id;
        // Check if the user has favorited this character
        const isCharacterFavorited = user && user.favorites && user.favorites.includes(characterId);
        setIsFavorited(isCharacterFavorited);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavorites();
  }, []); // Add an empty dependency array to avoid an infinite loop

  // Toggle the user's favorite status for the selected character
  const handleFavorites = useCallback(async () => {
    const apiUrl = '/marvel/toggleFavorites';
    try {
      const response = await axiosPost(apiUrl, {
        selectedCharacter,
        user,
        action: isFavorited ? 'unfavorite' : 'favorite'
      });
      console.log('FAVES', user);
      if (!isFavorited) {
        const updatedFavorites = [...user.favorites ?? [], response.data.id];
        setUser((prevState) => ({ ...prevState, favorites: updatedFavorites }));
      } else {
        const updatedFavorites = user.favorites.filter((favoriteId) => favoriteId !== response.data.id);
        setUser((prevState) => ({ ...prevState, favorites: updatedFavorites }));
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error(error);
    }
  }, [isFavorited, selectedCharacter, setUser, user]);

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl text-center mb-2'>{name}</h1>
      <div className='basis-full' />
      <div className="max-w-sm">
        <img
          src={imageUrl}
          alt={name}
          className='border-18 border-red-border w-full object-contain'
          style={{ borderImage: 'linear-gradient(to bottom, #B13434, #7F1D1D) 1' }}
        />
      </div>
      <div className='max-w-5xl mx-5 my-6'>
        <p className='w-11/12'>Biography: {description}</p>
        <p className='mt-6 w-11/12'>Comic Appearances: {comicAppearances}</p>
        <div className='mt-6 w-11/12 cursor-pointer' onClick={handleFavorites}>
          {user && user.username
            ? (
              <>
                <i className={`fa-${isFavorited ? 'solid' : 'regular'} fa-star inline mr-3`} />
                <p className="inline">Add to Favorites</p>
              </>
              )
            : (
              <Link to='/sign-in'>
                <p className="text-blue-500">Sign in to add to favorites!</p>
              </Link>
              )}
        </div>

      </div>
    </div>
  );
};

export default Character;
