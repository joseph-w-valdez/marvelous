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
  const [user, setUser] = useState({ username: null, pictureUrl: null });

  const reset = () => {
    setUser({ username: null, pictureUrl: null });
  };

  const value = { user, setUser, reset };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { useUser, UserProvider };
