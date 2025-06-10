import React from "react";
import ProductGrid from "../Product/ProductGrid";
import products from "../../data/featuredproducts";
import Button from "../UI/Button";

const FeaturedProductsSection = () => {
  return (
    <section className="py-[40px] flex flex-col items-center gap-[32px]">
      <div className="w-full max-w-[1300px] flex justify-between items-end flex-wrap md:flex-nowrap md:gap-0 gap-[24px]">
        <h1 className=" font-bold">DISCOVER THE LUXURIEST</h1>
        <Button text="Explore More" />
      </div>
      <ProductGrid products={products} />
    </section>
  );
};

export default FeaturedProductsSection;
