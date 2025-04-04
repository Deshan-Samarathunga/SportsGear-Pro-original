// client/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login: set user and token
  const login = (userData, token) => {
    const fullUser = { ...userData, token };
    setUser(fullUser);
    localStorage.setItem('user', JSON.stringify(fullUser));
    localStorage.setItem('token', token);
  };

  // Logout: clear everything
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // ✅ Update part of user object and sync
  const updateUser = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
