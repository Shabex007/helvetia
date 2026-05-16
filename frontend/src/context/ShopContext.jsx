import React, { createContext, useContext, useState, useEffect } from "react";
import apiService from "../services/apiService";
import { useAuth } from "./AuthContext";

// Create context
const ShopContext = createContext();

// Hook
export const useShop = () => useContext(ShopContext);

// Provider
export const ShopProvider = ({ children }) => {
  const [bagItems, setBagItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Load cart and wishlist from backend when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadUserData();
    } else {
      setBagItems([]);
      setWishlistItems([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadUserData = async () => {
    if (!isAuthenticated) return;

    try {
      const cartData = await apiService.getCart();
      setBagItems(cartData.items || []);
      const wishlistData = await apiService.getWishlist();
      setWishlistItems(wishlistData.items || []);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Bag actions
  const addToBag = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      window.location.href = "/auth";
      return;
    }

    try {
      await apiService.addToCart(product.id, quantity);
      await loadUserData();
    } catch (error) {
      console.error("Error adding to bag:", error);
    }
  };

  const updateBagQuantity = async (productId, quantity) => {
    if (!isAuthenticated) return;

    try {
      await apiService.updateCartItem(productId, quantity);
      await loadUserData();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromBag = async (productId) => {
    if (!isAuthenticated) return;

    try {
      await apiService.removeFromCart(productId);
      await loadUserData();
    } catch (error) {
      console.error("Error removing from bag:", error);
    }
  };

  const clearBag = async () => {
    if (!isAuthenticated) return;

    try {
      for (const item of bagItems) {
        await apiService.removeFromCart(item.product.id);
      }
      setBagItems([]);
    } catch (error) {
      console.error("Error clearing bag:", error);
    }
  };

  // Wishlist actions
  const addToWishlist = async (product) => {
    if (!isAuthenticated) {
      window.location.href = "/auth";
      return;
    }

    try {
      await apiService.addToWishlist(product.id);
      await loadUserData();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated) return;

    try {
      await apiService.removeFromWishlist(productId);
      await loadUserData();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.product?.id === productId);
  };

  return (
    <ShopContext.Provider
      value={{
        bagItems,
        wishlistItems,
        searchQuery,
        setSearchQuery,
        addToBag,
        updateBagQuantity,
        removeFromBag,
        clearBag,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        loading,
        refreshUserData: loadUserData,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
