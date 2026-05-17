import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminProvider, useAdmin } from "./context/AdminContext";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdmin();
  if (loading) return null;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <AppRoutes />
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;
