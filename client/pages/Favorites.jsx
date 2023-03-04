import React from 'react';

const Favorites = ({ onMount }) => {

  onMount(); // changes the subnavbar text

  return (
    <div className='text-white mx-7 mt-2 font-Poppins flex flex-wrap justify-center'>
      Favorites
    </div>
  );
};

export default Favorites;
