import React from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import "./Product.css";
import wishlist from "../../assets/wishlist.svg";
import bag from "../../assets/bag.svg";
import Button from "../Button/Button";

const ProductCard = ({ id, brand, model, price, image }) => {
  const navigate = useNavigate();
  const { addToBag, addToWishlist } = useShop();

  const handleAddToBag = () => {
    const product = { id, brand, model, price, image };
    addToBag(product);
    navigate("/bag");
  };

  return (
    <div className="product-card">
      <div className="product-header">
        <h6 className="product-brand">{brand}</h6>
        <div className="product-row">
          <h4 className="product-model">{model}</h4>
          <h5 className="product-price">${price.toLocaleString()}</h5>
        </div>
      </div>
      <img
        src={image}
        alt={model}
        className="product-image"
        onClick={() => navigate(`/product/${id}`)}
        style={{ cursor: "pointer" }}
      />
      <div className="product-actions">
        <button
          className="wishlist-btn"
          onClick={() => addToWishlist({ id, brand, model, price, image })}
        >
          <img src={wishlist} alt="wishlist icon" className="button-icon" />
        </button>
        <Button
          className="bag-btn"
          text="Add to Bag"
          iconRight={bag}
          onClick={handleAddToBag}
        />
      </div>
    </div>
  );
};

export default ProductCard;
