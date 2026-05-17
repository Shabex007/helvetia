import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);

export const adminApi = {
  // Auth
  login: (email, password) => api.post("/auth/login/", { email, password }),

  // Dashboard
  getDashboard: () => api.get("/admin/dashboard/"),
  getRecentOrders: () => api.get("/admin/recent-orders/"),
  getTopProducts: () => api.get("/admin/top-products/"),
  getSalesChart: (days = 30) => api.get(`/admin/sales-chart/?days=${days}`),

  // Orders
  getOrders: (page = 1, status = "") =>
    api.get(`/admin/orders/?page=${page}&status=${status}`),
  updateOrderStatus: (orderId, status) =>
    api.put(`/admin/orders/${orderId}/`, { order_status: status }),

  // Products
  getProducts: (page = 1) => api.get(`/admin/products/?page=${page}`),
  createProduct: (data) => api.post("/admin/products/create/", data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}/update/`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}/delete/`),
  getLowStock: () => api.get("/admin/low-stock/"),

  // Users
  getUsers: (page = 1) => api.get(`/admin/users/?page=${page}`),
  updateUser: (id, data) => api.patch(`/admin/users/${id}/`, data),
};

export default api;
