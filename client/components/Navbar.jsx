import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useUser } from '../contexts/UserContext';
import HamburgerMenu from './HamburgerMenu';

export default function Navbar() {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const hamburgerMenuRef = useRef(null);
  const { user } = useUser();

  useEffect(() => {
    const handleClickAnywhere = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
      if (hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(event.target)) {
        setIsHamburgerMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickAnywhere);

    return () => {
      document.removeEventListener('click', handleClickAnywhere);
    };
  }, [profileMenuRef, hamburgerMenuRef]);

  const handleProfileMenuClick = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleHamburgerClick = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  const renderProfileIcon = () => {
    if (user.pictureUrl) {
      return (
        <div className='w-9 h-9 profile-icon border-2 rounded-full overflow-hidden cursor-pointer'>
          <img
            src={user.pictureUrl}
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
        <i
          className={`text-white block sm:invisible fa-solid ${isHamburgerMenuOpen ? 'fa-times' : 'fa-bars'} ml-3 ${isHamburgerMenuOpen ? 'mr-3' : 'mr-2'} transform ${isHamburgerMenuOpen ? '-rotate-90' : 'rotate-0'} transition duration-300`}
          onClick={handleHamburgerClick}
          ref={hamburgerMenuRef}
        />
        <HamburgerMenu hamburgerMenu={isHamburgerMenuOpen}/>
        <Link to='/'>
          <span className='logo bg-[#B13434] text-white font-Impact text-4xl pl-1 pr-1'>
            Marvelous
          </span>
        </Link>
      </div>
      <div className='text-white font-Poppins flex flex-wrap items-center'>
        <Link to='/'><p className='mr-4 hidden sm:block'>Search</p></Link>
        <Link to='/favorites'><p className='mr-4 hidden sm:block'>Favorites</p></Link>
        {renderProfileIcon()}
        <ProfileMenu profileMenu={isProfileMenuOpen} />
      </div>
    </div>
  );
}
