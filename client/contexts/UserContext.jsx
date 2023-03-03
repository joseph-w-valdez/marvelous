import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const reset = () => {
    setUsername(null);
    setProfilePictureUrl(null);
  };

  return (
    <UserContext.Provider value={{ username, setUsername, profilePictureUrl, setProfilePictureUrl, reset }}>
      {children}
    </UserContext.Provider>
  );
};
