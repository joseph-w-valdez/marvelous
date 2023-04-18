import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axiosPost from '../utils/AxiosPost';
import { Link, useNavigate } from 'react-router-dom';
import { ScrollToTopOnPageChange } from '../utils/ScrollToTop';
import CharacterList from '../components/CharacterList';

const Favorites = ({ onMount }) => {
  ScrollToTopOnPageChange();
  const { user, setLoading } = useUser();
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  onMount(); // changes the subnavbar text

  useEffect(() => {
    if (user && user.username) {
      const fetchFavorites = async () => {
        const apiUrl = '/marvel/getFavorites';
        try {
          setLoading(true);
          const response = await axiosPost(apiUrl, { favorites: user.favorites });
          setCharacters(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, user]);

  if (!user || !user.username) {
    return (
      <div className="text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center text-center">
        <p>You are not currently logged in! Click&nbsp;<Link to='/sign-in' className='text-blue-500 underline'>here</Link>&nbsp;to login!</p>
      </div>
    );
  }

  const handleViewProfileClick = (character) => {
    navigate('/character', { state: { character } });
  };

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      {/* show the loading screen while waiting to retrieve favorites data */}
      {/* if there are no favorites show a relevant message with a link to the search page */
        characters.length === 0
          ? (
            <div className="w-full  text-center text-lg">
              No favorites found! Click <Link to='/' className='text-blue-500 underline'>here</Link> to search for characters to add!
            </div>
            )
            /* if there are favorites, render the list of characters */
          : (
            <CharacterList
              characters={characters}
              onClick={handleViewProfileClick}
              buttonText='VIEW PROFILE'
            />
            )}
    </div>
  );
};

export default Favorites;
