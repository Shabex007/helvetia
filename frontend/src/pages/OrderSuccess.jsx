import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="confirmation-wrapper">
      <h1>Thank You for Shopping!</h1>
      <p>
        Your order ID is <strong>{state?.orderId}</strong>
      </p>
      <button className="return-shop-btn" onClick={() => navigate("/watches")}>
        Return to Shop
      </button>
    </div>
  );
};

export default OrderSuccess;
