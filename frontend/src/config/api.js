// src/config/api.js
// Use a different approach that works with Create React App

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/auth/login/`,
  REGISTER: `${API_BASE_URL}/auth/register/`,
  LOGOUT: `${API_BASE_URL}/auth/logout/`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh/`,
  USER_PROFILE: `${API_BASE_URL}/auth/me/`,
  CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password/`,
  ADDRESSES: `${API_BASE_URL}/auth/addresses/`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password/`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password/`,

  // Products
  PRODUCTS: `${API_BASE_URL}/products/`,
  FEATURED_PRODUCTS: `${API_BASE_URL}/products/featured/`,
  NEW_ARRIVALS: `${API_BASE_URL}/products/new-arrivals/`,
  BESTSELLERS: `${API_BASE_URL}/products/bestsellers/`,
  CATEGORIES: `${API_BASE_URL}/products/categories/`,
  BRANDS: `${API_BASE_URL}/products/brands/`,
  PRODUCT_DETAIL: (slug) => `${API_BASE_URL}/products/${slug}/`,

  // Cart
  CART: `${API_BASE_URL}/cart/`,

  // Wishlist
  WISHLIST: `${API_BASE_URL}/wishlist/`,

  // Orders
  ORDERS: `${API_BASE_URL}/orders/`,
  CREATE_ORDER: `${API_BASE_URL}/orders/create/`,
  ORDER_DETAIL: (id) => `${API_BASE_URL}/orders/${id}/`,
  CANCEL_ORDER: (id) => `${API_BODE_URL}/orders/${id}/cancel/`,

  // Admin
  ADMIN_DASHBOARD: `${API_BASE_URL}/admin/dashboard/`,
  ADMIN_ORDERS: `${API_BASE_URL}/admin/orders/`,
  ADMIN_USERS: `${API_BASE_URL}/admin/users/`,
  ADMIN_PRODUCTS: `${API_BASE_URL}/admin/products/`,
  ADMIN_LOW_STOCK: `${API_BASE_URL}/admin/low-stock/`,
};

export default API_ENDPOINTS;
