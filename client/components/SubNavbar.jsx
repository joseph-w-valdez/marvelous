import React from 'react';

const SubNavbar = ({ text }) => {
  return (
    <div className="subNavbar w-full font-Audiowide fixed">
      <p className='text-white bold text-lg text-center p-1 bg-gradient-to-r from-[#B13434] to-red-900'>{text}</p>
    </div>
  );
};

export default SubNavbar;
