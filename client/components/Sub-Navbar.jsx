import React from 'react';

const SubNavbar = ({ text, subNavbarText }) => {
  return (
    <div className="subNavbar w-full  font-Audiowide">
      <p className='text-white bold text-lg text-center p-1 bg-gradient-to-r from-[#B13434] to-red-900'>{subNavbarText}</p>
    </div>
  );
};

export default SubNavbar;
