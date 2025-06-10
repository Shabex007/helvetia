import React from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import closeIcon from "../../assets/close.svg";
import upIcon from "../../assets/up.svg";
import downIcon from "../../assets/down.svg";

const BagCard = ({ item }) => {
  const navigate = useNavigate();
  const { updateBagQuantity, removeFromBag } = useShop();

  return (
    <div className="bag-card">
      <div className="bag-image">
        <img
          src={item.image}
          alt={item.model}
          onClick={() => navigate(`/product/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="bag-info">
        <div className="bag-top">
          <div className="bag-meta">
            <div className="brand">{item.brand}</div>
            <div className="model">{item.model}</div>
            <div className="price">${item.price.toLocaleString()}</div>
          </div>
          <img
            src={closeIcon}
            alt="Remove from Bag"
            className="bag-close"
            onClick={() => removeFromBag(item.id)}
          />
        </div>
        <div className="bag-bottom">
          <div className="product-quantity">
            <span className="quantity-value">{item.quantity}</span>
            <div className="quantity-button">
              <img
                src={upIcon}
                alt="Increase"
                className="increase"
                onClick={() =>
                  updateBagQuantity(item.id, Math.min(10, item.quantity + 1))
                }
                style={{ cursor: "pointer" }}
              />
              <img
                src={downIcon}
                alt="Decrease"
                className="decrease"
                onClick={() =>
                  updateBagQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="bag-total">
            <span>Total</span>
            <span>${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagCard;
