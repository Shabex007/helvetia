import React from "react";
import { useShop } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import WishlistCard from "./WishlistCard";
import Button from "../Button/Button";

const WishlistGrid = () => {
  const { wishlistItems } = useShop();

  return (
    <div className="bag-item-grid">
      {wishlistItems.length === 0 ? (
        <h2>Your Wishlist is Empty</h2>
      ) : (
        wishlistItems.map((item) => <WishlistCard key={item.id} item={item} />)
      )}
      <Button text="Return To Shop" onClick={() => window.history.back()} />
    </div>
  );
};

export default WishlistGrid;
