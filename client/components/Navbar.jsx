import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useUser } from '../contexts/UserContext';

export default function Navbar() {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const { profilePictureUrl } = useUser();

  useEffect(() => {
    const handleClickAnywhere = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickAnywhere);

    return () => {
      document.removeEventListener('click', handleClickAnywhere);
    };
  }, [profileMenuRef]);

  const handleProfileMenuClick = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const renderProfileIcon = () => {
    if (profilePictureUrl) {
      return (
        <div className='w-9 h-9 profile-icon border-2 rounded-full overflow-hidden cursor-pointer'>
          <img
            src={profilePictureUrl}
            alt="Profile picture"
            className="w-full h-full object-cover"
            ref={profileMenuRef}
            onClick={handleProfileMenuClick}
          />
        </div>
      );
    } else {
      return (
        <i
          className="profile-icon fa-regular fa-user text-white mr-2 cursor-pointer border-2 rounded-full overflow-hidden text-3xl"
          ref={profileMenuRef}
          onClick={handleProfileMenuClick}
        />
      );
    }
  };

  return (
    <div className='navbar flex items-center justify-between py-2 px-1 fixed top-0 w-full z-10 bg-[#131313]'>
      <div className='flex items-center'>
        <i className="text-white fa-solid fa-bars ml-3 mr-2" />
        <Link to='/'>
          <span className='logo bg-[#B13434] text-white font-Impact text-4xl pl-1 pr-1'>
            Marvelous
          </span>
        </Link>
      </div>
      <div>
        {renderProfileIcon()}
        <ProfileMenu profileMenu={isProfileMenuOpen} />
      </div>
    </div>
  );
}
