import React from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const BagSummary = () => {
  const navigate = useNavigate();
  const { bagItems } = useShop();

  const cost = bagItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const grandTotal = cost;

  return (
    <div className="order-summary">
      <div className="summary-card">
        <div className="summary-title">Order Summary</div>
        <div className="summary-detail">
          <div className="row">
            <span>Cost</span>
            <span>${cost.toLocaleString()}</span>
          </div>
          <div className="row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="row">
            <span>Tax</span>
            <span>On Checkout</span>
          </div>
          <div className="row total">
            <span>Total</span>
            <span>${grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <button className="checkout-button" onClick={() => navigate("/checkout")}>
        Checkout
      </button>
    </div>
  );
};

export default BagSummary;
