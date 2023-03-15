import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import axiosPost from '../utils/AxiosPost';

const ProfileMenu = ({ profileMenu }) => {
  const navigate = useNavigate();
  const { user, setUser, setLoading } = useUser();

  const handleFavorites = async () => {
    navigate('/favorites');
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await axiosPost('/marvel/sign-out', null);
      localStorage.removeItem('authToken'); // remove authentication token from local storage
      setUser({ username: null, pictureUrl: null });
      navigate('/sign-in');
    } catch (error) {
      console.error('FAILED SIGN OUT', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`
    w-48 h-auto rounded-md absolute right-5 text-white font-Poppins top-9 bg-[#333333]
     pt-1 pb-1 cursor-pointer ${profileMenu ? 'block' : 'hidden'}`
    } >
      {!user.username && <Link to='/sign-in'><p className='pl-2'>Sign In</p></Link>}
      {user.username && (
        <div>
          <div className='pl-2'>{user.username}</div>
          <div className="w-full h-[2px] bg-[#b0bec5] mt-1 mb-2" />
          <div className='pl-2' onClick={handleFavorites}><p>Favorites</p></div>
          <div className='pl-2' onClick={handleSignOut}><p>Sign Out</p></div>
        </div>)
      }
    </div>
  );
};

export default ProfileMenu;
