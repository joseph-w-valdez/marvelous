import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axiosPost from '../utils/AxiosPost';

const Favorites = ({ onMount }) => {
  const { user, setUser } = useUser();
  const [characters, setCharacters] = useState([]);

  onMount(); // changes the subnavbar text

  useEffect(() => {
    const fetchFavorites = async () => {
      const apiUrl = 'http://localhost:3000/marvel/getFavorites';
      try {
        const response = await axiosPost(apiUrl, { favorites: user.favorites });
        console.log('response', response.data);
        setCharacters(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl mb-4'>Favorite Characters:</h1>
      {characters.map((character) => (
        <div key={character.id} className='flex flex-wrap'>
          <div className="max-w-sm">
            <img
              src={character.imageUrl}
              alt={character.name}
              className='border-18 border-red-border w-full object-contain'
              style={{ borderImage: 'linear-gradient(to bottom, #B13434, #7F1D1D) 1' }}
            />
            <h1 className='text-3xl mt-2 mb-4'>{character.name}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
