import React from "react";
import ProductGrid from "../Product/ProductGrid";
import "./FeaturedProductsSection.css";
import products from "../../data/featuredproducts";
import Button from "../Button/Button";

const FeaturedProductsSection = () => {
  return (
    <section className="featured-products">
      <div className="featured-products-top-bar">
        <h1>DISCOVER THE LUXURIEST</h1>
        <Button text="Explore More" />
      </div>
      <ProductGrid products={products} />
    </section>
  );
};

export default FeaturedProductsSection;
