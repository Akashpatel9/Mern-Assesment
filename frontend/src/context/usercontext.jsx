import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const savedAuth = localStorage.getItem('authToken') || null;
  const [auth, setAuth] = useState(savedAuth);

  const saveUser = (token) => {
    setAuth(token);
    localStorage.setItem('authToken', token);
    window.location.reload()
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ auth, saveUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
