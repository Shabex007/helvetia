// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import apiService from "../services/apiService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const userData = await apiService.getProfile();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const data = await apiService.login(email, password);
    setUser(data.user);
    setIsAuthenticated(true);
    return data;
  };

  const register = async (userData) => {
    const data = await apiService.register(userData);
    return data;
  };

  const logout = async () => {
    await apiService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (data) => {
    const updatedUser = await apiService.updateProfile(data);
    setUser(updatedUser);
    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
