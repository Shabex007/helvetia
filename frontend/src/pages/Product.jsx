// src/pages/WatchDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import ProductDetails from "../components/Product/ProductDetails";

const WatchDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div>Product not found</div>;

  return <ProductDetails product={product} />;
};

export default WatchDetails;
