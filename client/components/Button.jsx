import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button className='text-white bg-[#B13434] font-Poppins w-36 h-9 rounded-lg m-4 cursor-pointer' onClick={onClick}>{text}</button>
  );
};

export default Button;
