import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

const ProfileMenu = ({ profileMenu }) => {
  const navigate = useNavigate();
  const { username, setUsername, setProfilePictureUrl } = useContext(UserContext);

  const handleTestAuth = async () => {
    console.log('MAKING THE REQUEST');
    try {
      await axios.post('http://localhost:3000/marvel/auth-test', null, { headers: { 'X-Access-Token': localStorage.getItem('authToken') } });
      console.log('SUCCESSFUL AUTH TEST');
    } catch (error) {
      console.error('FAILED AUTH TEST', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await axios.post('http://localhost:3000/marvel/sign-out', null, { headers: { 'X-Access-Token': localStorage.getItem('authToken') } });
      localStorage.removeItem('authToken'); // remove authentication token from local storage
      setUsername(null);
      setProfilePictureUrl(null);
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
      {!username && <Link to='/sign-in'><p>Sign In</p></Link>}
      {username && (
      <div>
        <div onClick={handleTestAuth}><p>My Favorites</p></div>
        <div onClick={handleSignOut}><p>Sign Out</p></div>
      </div>)
          }
    </div>
  );
};

export default ProfileMenu;
