import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const reset = () => {
    setUsername(null);
    setProfilePictureUrl(null);
  };

  const value = { username, setUsername, profilePictureUrl, setProfilePictureUrl, reset };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { useUser, UserProvider };
