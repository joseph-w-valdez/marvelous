import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: null, pictureUrl: null, favorites: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const reset = () => {
    setUser({ username: null, pictureUrl: null, favorites: [] });
    localStorage.removeItem('user');
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const value = { user, setUser, reset, loading, setLoading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { useUser, UserProvider };
