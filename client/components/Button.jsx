import React from 'react';

const Button = ({ text, onClick, color }) => {
  const bgColor = color || '[#B13434]'; // use the provided color if it exists, otherwise use the default color

  return (
    <button className={`text-white font-Poppins w-36 h-9 rounded-lg m-4 cursor-pointer bg-${bgColor}`} onClick={onClick}>{text}</button>
  );
};

export default Button;
