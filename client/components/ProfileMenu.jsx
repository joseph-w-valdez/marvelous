import React from 'react';

const ProfileMenu = ({ profileMenu }) => {
  return (
    <div className={`
    w-48 h-auto rounded-md absolute right-5 text-white font-Poppins top-9 bg-[#333333]
    pl-2 pt-1 pb-1 cursor-pointer ${profileMenu === 'closed' ? 'hidden' : 'block'}`
} >
      Sign In
    </div>
  );
};

export default ProfileMenu;
