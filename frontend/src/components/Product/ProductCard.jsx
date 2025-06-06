import React from "react";
import "./Product.css";
import wishlist from "../../assets/wishlist.svg";
import bag from "../../assets/bag.svg";
import Button from "../Button/Button";

const ProductCard = ({ brand, model, price, image }) => {
  return (
    <div className="product-card">
      <div className="product-header">
        <span className="product-brand">{brand}</span>
        <div className="product-row">
          <span className="product-model">{model}</span>
          <span className="product-price">${price.toLocaleString()}</span>
        </div>
      </div>
      <img src={image} alt={model} className="product-image" />
      <div className="product-actions">
        <Button className="wishlist-btn" iconRight={wishlist} />
        <Button className="bag-btn" text="Add to Bag" iconRight={bag} />
      </div>
    </div>
  );
};

export default ProductCard;
