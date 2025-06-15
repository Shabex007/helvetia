import React, { createContext, useContext, useState, useEffect } from "react";
import products from "../data/products";

// Create context
const ShopContext = createContext();

// Hook
export const useShop = () => useContext(ShopContext);

// Provider
export const ShopProvider = ({ children }) => {
  // Bag state
  const [bagItems, setBagItems] = useState([]);

  const addToBag = (product, quantity = 1) => {
    setBagItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateBagQuantity = (productId, quantity) => {
    setBagItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromBag = (productId) => {
    setBagItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearBag = () => setBagItems([]);

  // Wishlist state
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const updateWishlistQuantity = (productId, quantity) => {
    setWishlistItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // ✅ Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Return context value
  return (
    <ShopContext.Provider
      value={{
        // Bag
        bagItems,
        addToBag,
        updateBagQuantity,
        removeFromBag,
        clearBag,
        // Wishlist
        wishlistItems,
        addToWishlist,
        updateWishlistQuantity,
        removeFromWishlist,
        // ✅ Search
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
