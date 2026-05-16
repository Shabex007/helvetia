import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/Product/ProductDetails";

const WatchDetails = () => {
  const { slug } = useParams(); // Change from 'id' to 'slug'

  if (!slug) {
    return <div className="text-center py-10">Invalid product ID</div>;
  }

  return <ProductDetails slug={slug} />;
};

export default WatchDetails;
