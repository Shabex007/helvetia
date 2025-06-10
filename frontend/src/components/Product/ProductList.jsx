import React, { useState } from "react";
import ProductGrid from "./ProductGrid";
import Button from "../UI/Button";
import products from "../../data/products";

const ProductList = () => {
  const uniqueBrands = [...new Set(products.map((p) => p.brand.toUpperCase()))];
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  const filteredProducts =
    selectedBrand === "ALL"
      ? products
      : products.filter((p) => p.brand.toUpperCase() === selectedBrand);

  const groupedProducts = {};
  filteredProducts.forEach((product) => {
    const brand = product.brand.toUpperCase();
    if (!groupedProducts[brand]) {
      groupedProducts[brand] = [];
    }
    groupedProducts[brand].push(product);
  });

  return (
    <>
      {/* Brand Filter Buttons */}
      <div className="py-[25px] w-full flex flex-wrap justify-center items-center gap-[20px]">
        <Button
          text="ALL"
          iconRight={null}
          onClick={() => setSelectedBrand("ALL")}
          className={selectedBrand === "ALL" ? "bg-[#a20009] text-white" : ""}
        />
        {uniqueBrands.map((brand) => (
          <Button
            key={brand}
            text={brand}
            iconRight={null}
            onClick={() => setSelectedBrand(brand)}
            className={selectedBrand === brand ? "bg-[#a20009] text-white" : ""}
          />
        ))}
      </div>

      {/* Product Sections */}
      <div>
        {selectedBrand === "ALL" ? (
          Object.entries(groupedProducts).map(([brand, items]) => (
            <div
              key={brand}
              className="py-[25px] w-full flex flex-col items-center gap-[50px]"
            >
              <h1>{brand}</h1>
              <ProductGrid products={items} />
            </div>
          ))
        ) : (
          <div className="py-[25px] w-full flex flex-col items-center gap-[50px]">
            <h1>{selectedBrand}</h1>
            <ProductGrid products={filteredProducts} />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
