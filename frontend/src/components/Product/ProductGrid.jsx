import React from "react";
import ProductCard from "./ProductCard";
import "./Product.css";

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map(({ id, brand, model, price, image }) => (
        <ProductCard
          key={id}
          brand={brand}
          model={model}
          price={price}
          image={image}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
