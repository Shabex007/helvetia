import React from "react";
import ProductCard from "../UI/ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,2vw,32px)] w-full max-w-[1300px] box-border">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          slug={product.slug}
          brand={product.brand}
          model={product.model || product.name}
          price={product.price}
          image={product.thumbnail || product.images?.[0]}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
