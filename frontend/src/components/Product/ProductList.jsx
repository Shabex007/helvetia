import React, { useState } from "react";
import { useShop } from "../../context/ShopContext";
import ProductGrid from "./ProductGrid";
import Button from "../UI/Button";
import products from "../../data/products";

const ProductList = () => {
  const { searchQuery } = useShop();
  const uniqueBrands = [...new Set(products.map((p) => p.brand.toUpperCase()))];
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  // Normalize query
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Filtering logic
  let filteredProducts = [];

  if (normalizedQuery) {
    filteredProducts = products.filter(
      (p) =>
        p.brand.toLowerCase().includes(normalizedQuery) ||
        p.model.toLowerCase().includes(normalizedQuery)
    );
  } else {
    filteredProducts =
      selectedBrand === "ALL"
        ? products
        : products.filter((p) => p.brand.toUpperCase() === selectedBrand);
  }

  // Grouped by brand
  const groupedProducts = {};
  filteredProducts.forEach((product) => {
    const brand = product.brand.toUpperCase();
    if (!groupedProducts[brand]) {
      groupedProducts[brand] = [];
    }
    groupedProducts[brand].push(product);
  });

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 box-border">
      {/* Brand Filter Buttons (hidden when searching) */}
      {!normalizedQuery && (
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
              className={
                selectedBrand === brand ? "bg-[#a20009] text-white" : ""
              }
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-[#a20009] font-semibold text-lg mt-10">
          No matching products found.
        </p>
      )}

      {/* Product Display */}
      {normalizedQuery ? (
        <div className="py-[25px] w-full flex flex-col items-center gap-[50px]">
          <h2>Search Results</h2>
          <ProductGrid products={filteredProducts} />
        </div>
      ) : selectedBrand === "ALL" ? (
        Object.entries(groupedProducts).map(([brand, items]) => (
          <div
            key={brand}
            className="py-[25px] w-full flex flex-col items-center gap-[50px]"
          >
            <h2>{brand}</h2>
            <ProductGrid products={items} />
          </div>
        ))
      ) : (
        <div className="py-[25px] w-full flex flex-col items-center gap-[50px]">
          <h2>{selectedBrand}</h2>
          <ProductGrid products={filteredProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
