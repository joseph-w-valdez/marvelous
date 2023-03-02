import React from 'react';
import { Link } from 'react-router-dom';

const ProfileMenu = ({ profileMenu }) => {

  return (
    <div className={`
    w-48 h-auto rounded-md absolute right-5 text-white font-Poppins top-9 bg-[#333333]
    pl-2 pt-1 pb-1 cursor-pointer ${profileMenu ? 'block' : 'hidden'}`
} >
      <Link to='/sign-in'><p>Sign In</p></Link>
    </div>
  );
};

export default ProfileMenu;
