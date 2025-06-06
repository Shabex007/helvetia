import React from "react";
import "./BrandSection.css";

const BrandCard = ({ logo }) => {
  return (
    <div className="brand-card">
      <img src={logo} alt="brand logo" className="brand-logo" />
    </div>
  );
};

export default BrandCard;
