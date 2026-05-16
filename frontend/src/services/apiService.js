// src/services/apiService.js
import axios from "axios";

// Hardcode the URL for now
const API_BASE_URL = "http://localhost:8000/api";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor to add token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem("refresh_token");
            const response = await this.api.post("/auth/refresh/", {
              refresh: refreshToken,
            });
            localStorage.setItem("access_token", response.data.access);
            originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/auth";
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  // Auth Methods
  async login(email, password) {
    const response = await this.api.post("/auth/login/", { email, password });
    if (response.data.access) {
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
    }
    return response.data;
  }

  async register(userData) {
    const response = await this.api.post("/auth/register/", userData);
    return response.data;
  }

  async logout() {
    await this.api.post("/auth/logout/");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  async getProfile() {
    const response = await this.api.get("/auth/me/");
    return response.data;
  }

  async updateProfile(data) {
    const response = await this.api.patch("/auth/me/", data);
    return response.data;
  }

  async changePassword(oldPassword, newPassword) {
    const response = await this.api.post("/auth/change-password/", {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: newPassword,
    });
    return response.data;
  }

  // Address Methods
  async getAddresses() {
    const response = await this.api.get("/auth/addresses/");
    return response.data;
  }

  async addAddress(address) {
    const response = await this.api.post("/auth/addresses/", address);
    return response.data;
  }

  async updateAddress(addressId, address) {
    const response = await this.api.put(
      `/auth/addresses/${addressId}/`,
      address,
    );
    return response.data;
  }

  async deleteAddress(addressId) {
    const response = await this.api.delete(`/auth/addresses/${addressId}/`);
    return response.data;
  }

  // Product Methods
  async getProducts(params = {}) {
    const response = await this.api.get("/products/", { params });
    return response.data;
  }

  async getProduct(slug) {
    const response = await this.api.get(`/products/${slug}/`);
    return response.data;
  }

  async getFeaturedProducts() {
    const response = await this.api.get("/products/featured/");
    return response.data;
  }

  async getCategories() {
    const response = await this.api.get("/products/categories/");
    return response.data;
  }

  async getBrands() {
    const response = await this.api.get("/products/brands/");
    return response.data;
  }

  // Cart Methods
  async getCart() {
    const response = await this.api.get("/cart/");
    return response.data;
  }

  async addToCart(productId, quantity = 1) {
    const response = await this.api.post("/cart/", {
      product_id: productId,
      quantity,
    });
    return response.data;
  }

  async updateCartItem(productId, quantity) {
    const response = await this.api.put("/cart/", {
      product_id: productId,
      quantity,
    });
    return response.data;
  }

  async removeFromCart(productId) {
    const response = await this.api.delete("/cart/", {
      data: { product_id: productId },
    });
    return response.data;
  }

  // Wishlist Methods
  async getWishlist() {
    const response = await this.api.get("/wishlist/");
    return response.data;
  }

  async addToWishlist(productId) {
    const response = await this.api.post("/wishlist/", {
      product_id: productId,
    });
    return response.data;
  }

  async removeFromWishlist(productId) {
    const response = await this.api.delete("/wishlist/", {
      data: { product_id: productId },
    });
    return response.data;
  }

  // Order Methods
  async getOrders() {
    const response = await this.api.get("/orders/");
    return response.data;
  }

  async getOrder(orderId) {
    const response = await this.api.get(`/orders/${orderId}/`);
    return response.data;
  }

  async createOrder(orderData) {
    const response = await this.api.post("/orders/create/", orderData);
    return response.data;
  }

  async cancelOrder(orderId) {
    const response = await this.api.post(`/orders/${orderId}/cancel/`);
    return response.data;
  }
}

export default new ApiService();
