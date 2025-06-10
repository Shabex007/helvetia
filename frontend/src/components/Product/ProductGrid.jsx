import React from "react";
import ProductCard from "./ProductCard";
import "./Product.css";

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map(({ id, brand, model, price, images }) => (
        <ProductCard
          key={id}
          id={id}
          brand={brand}
          model={model}
          price={price}
          image={images[0]} // 🛠️ use first image for the grid card
        />
      ))}
    </div>
  );
};

export default ProductGrid;
