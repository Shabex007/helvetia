import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAdmin } from "../../context/AdminContext";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Sidebar onLogout={handleLogout} />
      <div className="ml-72">
        <Header />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
