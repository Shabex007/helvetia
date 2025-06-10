import React from "react";
import ProductCard from "../UI/ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,2vw,32px)] w-full max-w-[1300px] box-border">
      {products.map(({ id, brand, model, price, images }) => (
        <ProductCard
          key={id}
          id={id}
          brand={brand}
          model={model}
          price={price}
          image={images[0]}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
