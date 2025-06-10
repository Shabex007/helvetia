// src/components/ProductDetails.jsx
import React, { useState } from "react";
import { useShop } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import wishlist from "../../assets/wishlist.svg";
import bag from "../../assets/bag.svg";
import deliveryTruck from "../../assets/icon-delivery.svg";
import returnIcon from "../../assets/icon-return.svg";
import upIcon from "../../assets/up.svg"; // Use your actual icon path
import downIcon from "../../assets/down.svg";
import Button from "../Button/Button";

const ProductDetails = ({ product }) => {
  const { brand, model, price, images, description } = product;
  const { addToBag, addToWishlist } = useShop();

  const handleAddToBag = () => {
    addToBag({ ...product, image: product.images[0] }, quantity);
    navigate("/bag");
  };

  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleIncrease = () => setQuantity((q) => q + 1);

  return (
    <section className="product-container">
      {/* LEFT SIDE: Images */}
      <div className="product-gallery">
        <div className="thumbnail-list">
          {images.map((img, i) => (
            <div className="thumbnail" key={i}>
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                onClick={() => setMainImage(img)}
                className={mainImage === img ? "active-thumb" : ""}
              />
            </div>
          ))}
        </div>
        <div className="main-image">
          <img src={mainImage} alt={model} />
        </div>
      </div>

      {/* RIGHT SIDE: Info */}
      <div className="product-info">
        <div className="product-meta">
          <h5 className="brand">{brand}</h5>
          <h2 className="title">{model}</h2>
          <h4 className="price">${price.toLocaleString()}</h4>
        </div>

        <p className="description">{description}</p>
        <hr className="divider" />

        {/* Quantity & Action Buttons */}
        <div className="actions">
          <div className="product-quantity">
            <span className="quantity-value">{quantity}</span>
            <div className="quantity-button">
              <img
                src={upIcon}
                alt="Increase"
                className="increase"
                onClick={handleIncrease}
                style={{ cursor: "pointer" }}
              />
              <img
                src={downIcon}
                alt="Decrease"
                className="decrease"
                onClick={handleDecrease}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <div className="product-actions">
            <Button
              className="wishlist-btn"
              text={null}
              iconRight={wishlist}
              onClick={() =>
                addToWishlist({
                  id: product.id,
                  brand,
                  model,
                  price,
                  image: product.images[0],
                })
              }
            />

            <Button
              className="bag-btn"
              text="Add to Bag"
              iconRight={bag}
              onClick={handleAddToBag}
            />
          </div>
        </div>

        {/* Delivery Info */}
        <div className="product-support">
          <div className="product-support-item">
            <img src={deliveryTruck} className="product-support-icon truck" />
            <div className="product-support-text">
              <h6 className="label">Free Delivery</h6>
              <p className="subtext">Free Delivery on all orders</p>
            </div>
          </div>
          <hr className="divider" />
          <div className="product-support-item">
            <img src={returnIcon} className="product-support-icon return" />
            <div className="product-support-text">
              <h6 className="label">Return Delivery</h6>
              <p className="subtext">
                Free 30 Days Delivery Returns.{" "}
                <span className="underline">Details</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
