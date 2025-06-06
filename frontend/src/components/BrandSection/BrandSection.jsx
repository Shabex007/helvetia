// src/components/BrandSection.jsx
import React from "react";
import "./BrandSection.css";
import BrandCard from "./BrandCard";
import brandData from "../../data/brands"; // Using JS not JSON

const BrandSection = () => {
  return (
    <section className="brand-section">
      <h2>SHOP YOUR FAVOURITE BRANDS</h2>
      <div className="brand-grid">
        {brandData.map(({ id, logo }) => (
          <BrandCard key={id} logo={logo} />
        ))}
      </div>
    </section>
  );
};

export default BrandSection;
