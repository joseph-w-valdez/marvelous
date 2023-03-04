import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import axiosPost from '../utils/AxiosPost';

const ProfileMenu = ({ profileMenu }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleFavorites = async () => {
    navigate('/favorites');
  };

  const handleSignOut = async () => {
    try {
      await axiosPost('http://localhost:3000/marvel/sign-out', null);
      localStorage.removeItem('authToken'); // remove authentication token from local storage
      setUser({ username: null, pictureUrl: null });
      navigate('/sign-in');
    } catch (error) {
      console.error('FAILED SIGN OUT', error);
    }
  };

  return (
    <div className={`
    w-48 h-auto rounded-md absolute right-5 text-white font-Poppins top-9 bg-[#333333]
    pl-2 pt-1 pb-1 cursor-pointer ${profileMenu ? 'block' : 'hidden'}`
    } >
      {!user.username && <Link to='/sign-in'><p>Sign In</p></Link>}
      {user.username && (
        <div>
          <div onClick={handleFavorites}><p>My Favorites</p></div>
          <div onClick={handleSignOut}><p>Sign Out</p></div>
        </div>)
      }
    </div>
  );
};

export default ProfileMenu;
