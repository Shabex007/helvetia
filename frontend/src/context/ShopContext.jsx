import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [bagItems, setBagItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToBag = (product, quantity = 1) => {
    const exists = bagItems.find((item) => item.id === product.id);
    if (exists) {
      setBagItems(
        bagItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setBagItems([...bagItems, { ...product, quantity }]);
    }
  };

  const updateBagQuantity = (id, quantity) => {
    setBagItems(
      bagItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromBag = (id) => {
    setBagItems(bagItems.filter((item) => item.id !== id));
  };

  // Wishlist Functions (Mirror Bag Logic)
  const addToWishlist = (product, quantity = 1) => {
    const exists = wishlistItems.find((item) => item.id === product.id);
    if (exists) {
      setWishlistItems(
        wishlistItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setWishlistItems([...wishlistItems, { ...product, quantity }]);
    }
  };

  const updateWishlistQuantity = (id, quantity) => {
    setWishlistItems(
      wishlistItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const clearBag = () => {
    setBagItems([]);
  };

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
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
