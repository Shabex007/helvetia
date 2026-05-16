import React, { useState, useEffect } from "react";
import ProductGrid from "../Product/ProductGrid";
import apiService from "../../services/apiService";
import Button from "../UI/Button";

const FeaturedProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const data = await apiService.getFeaturedProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-[40px] flex flex-col items-center gap-[32px]">
        <div className="text-center">Loading featured products...</div>
      </section>
    );
  }

  return (
    <section className="py-[40px] flex flex-col items-center gap-[32px]">
      <div className="w-full max-w-[1300px] flex justify-between items-end flex-wrap md:flex-nowrap md:gap-0 gap-[24px]">
        <h1 className="font-bold">DISCOVER THE LUXURIEST</h1>
        <Button
          text="Explore More"
          onClick={() => (window.location.href = "/watches")}
        />
      </div>
      <ProductGrid products={products} />
    </section>
  );
};

export default FeaturedProductsSection;
