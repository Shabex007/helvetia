import React, { useState, useEffect } from "react";
import { useShop } from "../../context/ShopContext";
import ProductGrid from "./ProductGrid";
import Button from "../UI/Button";
import apiService from "../../services/apiService";

const ProductList = () => {
  const { searchQuery } = useShop();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products and brands from API
  useEffect(() => {
    fetchProducts();
    fetchBrands();
  }, [searchQuery, selectedBrand]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let params = {};

      if (searchQuery) {
        params.search = searchQuery;
      } else if (selectedBrand !== "ALL") {
        params.brand = selectedBrand;
      }

      const data = await apiService.getProducts(params);
      setProducts(data.results || []);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const data = await apiService.getBrands();
      setBrands(data.map((b) => b.name.toUpperCase()));
    } catch (err) {
      console.error("Error fetching brands:", err);
    }
  };

  // Group products by brand when no search or filter
  const groupedProducts = {};
  if (!searchQuery && selectedBrand === "ALL") {
    products.forEach((product) => {
      const brand = product.brand.toUpperCase();
      if (!groupedProducts[brand]) {
        groupedProducts[brand] = [];
      }
      groupedProducts[brand].push(product);
    });
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 box-border">
      {/* Brand Filter Buttons (hidden when searching) */}
      {!searchQuery && (
        <div className="py-[25px] w-full flex flex-wrap justify-center items-center gap-[20px]">
          <Button
            text="ALL"
            iconRight={null}
            onClick={() => setSelectedBrand("ALL")}
            className={selectedBrand === "ALL" ? "bg-[#a20009] text-white" : ""}
          />
          {brands.map((brand) => (
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
      {products.length === 0 && (
        <p className="text-center text-[#a20009] font-semibold text-lg mt-10">
          No matching products found.
        </p>
      )}

      {/* Product Display */}
      {searchQuery ? (
        <div className="py-[25px] w-full flex flex-col items-center gap-[50px]">
          <h2>Search Results for "{searchQuery}"</h2>
          <ProductGrid products={products} />
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
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
