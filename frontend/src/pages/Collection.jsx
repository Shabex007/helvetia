import React, { useState } from "react";
import "./styles/Watches.css";
import banner from "../assets/banner.png";
import ProductGrid from "../components/Product/ProductGrid";
import Button from "../components/Button/Button";
import products from "../data/products";

const Watches = () => {
  // ✅ 1. Extract unique brands
  const uniqueBrands = [...new Set(products.map((p) => p.brand.toUpperCase()))];
  const [selectedBrand, setSelectedBrand] = useState("ALL");

  // ✅ 2. Filter products based on selected brand
  const filteredProducts =
    selectedBrand === "ALL"
      ? products
      : products.filter((p) => p.brand.toUpperCase() === selectedBrand);

  // ✅ 3. Group filtered products by brand
  const groupedProducts = {};
  filteredProducts.forEach((product) => {
    const brand = product.brand.toUpperCase();
    if (!groupedProducts[brand]) {
      groupedProducts[brand] = [];
    }
    groupedProducts[brand].push(product);
  });

  return (
    <div>
      <div className="banner-box">
        <div className="banner">
          <img src={banner} alt="Watches Banner" className="watches-banner" />
        </div>
      </div>

      {/* Brand Filter Buttons */}
      <div className="brand-buttons">
        <Button
          text="ALL"
          iconRight={null}
          onClick={() => setSelectedBrand("ALL")}
          className={selectedBrand === "ALL" ? "active" : ""}
        />
        {uniqueBrands.map((brand) => (
          <Button
            key={brand}
            text={brand}
            iconRight={null}
            onClick={() => setSelectedBrand(brand)}
            className={selectedBrand === brand ? "active" : ""}
          />
        ))}
      </div>

      {/* Brand Product Sections */}
      <div>
        {selectedBrand === "ALL" ? (
          Object.entries(groupedProducts).map(([brand, items]) => (
            <div key={brand} className="brand-products">
              <h1>{brand}</h1>
              <ProductGrid products={items} />
            </div>
          ))
        ) : (
          <div className="brand-products">
            <h1>{selectedBrand}</h1>
            <ProductGrid products={filteredProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Watches;
