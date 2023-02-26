import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='navbar flex items-center justify-between my-2 mx-1 fixed top-0 w-full z-10'>
      <div className='flex items-center'>
        <i className="text-white fa-solid fa-bars ml-3 mr-2" />
        <Link to='/'><span className='logo bg-[#B13434] text-white font-Impact text-4xl pl-1 pr-1'>Marvelous</span></Link>

      </div>
      <i className="profile-icon fa-regular fa-user text-white mr-2" />
    </div>
  );
}
