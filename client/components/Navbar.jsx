import React from 'react';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

export default function Navbar() {
  return (
    <div className='navbar flex items-center justify-between py-2 px-1 fixed top-0 w-full z-10 bg-[#131313]'>
      <div className='flex items-center'>
        <i className="text-white fa-solid fa-bars ml-3 mr-2" />
        <Link to='/'><span className='logo bg-[#B13434] text-white font-Impact text-4xl pl-1 pr-1'>Marvelous</span></Link>

      </div>
      <i className="profile-icon fa-regular fa-user text-white mr-2 cursor-pointer border-2 rounded-full overflow-hidden text-2xl" />
      <ProfileMenu />
    </div>
  );
}
