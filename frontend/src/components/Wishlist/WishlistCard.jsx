import React from "react";
import { useShop } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import bag from "../../assets/bag.svg";
import bin from "../../assets/bin.svg";

const WishlistCard = ({ item }) => {
  const { removeFromWishlist, addToBag } = useShop();
  const navigate = useNavigate();

  const handleMoveToBag = () => {
    addToBag(item);
    removeFromWishlist(item.id);
    navigate("/bag");
  };

  return (
    <div className="bag-item-card">
      <div className="bag-item-image">
        <img
          src={item.image}
          alt={item.model}
          onClick={() => navigate(`/product/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="bag-item-details">
        <div className="bag-item-info">
          <h6 className="bag-item-brand">{item.brand}</h6>
          <h4 className="bag-item-name">{item.model}</h4>
          <h6 className="bag-item-price">${item.price.toLocaleString()}</h6>
        </div>
        <div className="bag-item-options">
          <button className="bag-page-btn" onClick={handleMoveToBag}>
            <img src={bag} alt="cart" className="bag-btn-icon" />
          </button>
          <button
            className="bag-page-btn"
            onClick={() => removeFromWishlist(item.id)}
          >
            <img src={bin} alt="remove" className="bag-btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
