import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const reset = () => {
    setUserId(null);
    setProfilePictureUrl(null);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, profilePictureUrl, setProfilePictureUrl, reset }}>
      {children}
    </UserContext.Provider>
  );
};
