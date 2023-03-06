import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axiosPost from '../utils/AxiosPost';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ScrollToTopOnPageChange } from '../utils/ScrollToTop';

const Favorites = ({ onMount }) => {
  ScrollToTopOnPageChange();
  const { user } = useUser();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  onMount(); // changes the subnavbar text

  useEffect(() => {
    const fetchFavorites = async () => {
      const apiUrl = 'http://localhost:3000/marvel/getFavorites';
      try {
        setLoading(true);
        const response = await axiosPost(apiUrl, { favorites: user.favorites });
        console.log('response', response.data);
        setCharacters(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      <h1 className='text-4xl mb-4 w-full text-center'>Favorite Characters:</h1>
      {/* show the loading screen while waiting to retrieve favorites data */}
      {loading
        ? (
          <div className="w-full text-center text-2xl">Loading...</div>
          )
          /* if there are no favorites show a relevant message with a link to the search page */
        : characters.length === 0
          ? (
            <div className="w-full text-center text-2xl">
              No favorites found! Click <Link to='/' className='text-blue-500 underline'>here</Link> to search for characters to add!
            </div>
            )
            /* if there are favorites, go through each item and render them with this format */
          : (
              characters.map((character) => (
                <div key={character.id} className='flex flex-wrap w-full justify-center mb-4'>
                  <div className="max-w-sm">
                    <img
                src={character.imageUrl}
                alt={character.name}
                className='border-18 border-red-border w-full object-contain'
                style={{ borderImage: 'linear-gradient(to bottom, #B13434, #7F1D1D) 1' }}
              />
                    <h1 className='text-3xl mt-2'>{character.name}</h1>
                    <Button text='VIEW PROFILE' onClick={() => navigate('/character', { state: { character } })} />
                  </div>
                </div>
              ))
            )}
    </div>
  );
};

export default Favorites;
