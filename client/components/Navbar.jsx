import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='navbar flex items-center justify-between m-2'>
      <div className='flex items-center'>
        <i className="text-white fa-solid fa-bars ml-3 mr-2" />
        <Link to='/'><span className='logo bg-[#B13434] text-white font-Impact text-4xl pl-1 pr-1'>Marvelous</span></Link>

      </div>
      <Link to='/Character'><i className="profile-icon fa-regular fa-user text-white mr-2" /></Link>
    </div>
  );
}
