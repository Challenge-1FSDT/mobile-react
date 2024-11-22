// context/authContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado inicial vazio ou um valor adequado

  const login = (userData) => {
    setUser(userData);  // Logar usuário
  };

  const logout = () => {
    setUser(null);  // Deslogar usuário
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
