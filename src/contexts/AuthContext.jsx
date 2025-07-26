import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const accessToken = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    return accessToken && email && role ? { accessToken, email, role } : null;
  });

  const login = ({ accessToken, email, role }) => {
    const authData = { accessToken, email, role };
    setAuth(authData);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  };

  const isAuthenticated = !!auth;

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
