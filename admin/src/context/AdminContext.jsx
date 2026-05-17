import React, { createContext, useContext, useState, useEffect } from "react";
import { adminApi } from "../services/api";
import toast from "react-hot-toast";

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const user = localStorage.getItem("admin_user");
    if (token && user) {
      setAdmin(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await adminApi.login(email, password);
      const { access, user } = response.data;

      if (user.role !== "admin" && user.role !== "staff") {
        throw new Error("Unauthorized: Admin access required");
      }

      localStorage.setItem("admin_token", access);
      localStorage.setItem("admin_user", JSON.stringify(user));
      setAdmin(user);
      toast.success(`Welcome back, ${user.first_name || user.email}`);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setAdmin(null);
    toast.success("Logged out successfully");
    window.location.href = "/admin/login";
  };

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
