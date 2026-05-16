import React, { useState, useEffect } from "react";
import { useShop } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/imageHelper";
import apiService from "../../services/apiService";

import wishlist from "../../assets/wishlist.svg";
import bag from "../../assets/bag.svg";
import deliveryTruck from "../../assets/icon-delivery.svg";
import returnIcon from "../../assets/icon-return.svg";
import upIcon from "../../assets/up.svg";
import downIcon from "../../assets/down.svg";

import Button from "../UI/Button";

const ProductDetails = ({ slug }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToBag, addToWishlist } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const data = await apiService.getProduct(slug);
      setProduct(data);
      // Process image URLs through getImageUrl
      const firstImage = data.images?.[0] || data.thumbnail;
      setMainImage(getImageUrl(firstImage));
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleIncrease = () => setQuantity((q) => q + 1);

  const handleAddToBag = () => {
    addToBag(product, quantity);
    navigate("/bag");
  };

  if (loading) {
    return <div className="text-center py-10">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  // Process all image URLs
  const productImages = (product.images || [product.thumbnail]).map((img) =>
    getImageUrl(img),
  );

  return (
    <section className="flex flex-col lg:flex-row gap-[70px] px-4 py-[70px] box-border">
      {/* LEFT: Image Gallery */}
      <div className="flex gap-[30px] flex-wrap">
        <div className="flex flex-col gap-4">
          {productImages.map((img, i) => (
            <div
              key={i}
              className={`w-[170px] h-[140px] bg-[#f5f5f5] flex justify-center items-center p-2 rounded-lg outline-1 outline-[#d0d0d0] cursor-pointer`}
              onClick={() => setMainImage(img)}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className={`h-full transition-opacity ${
                  mainImage === img ? "opacity-100" : "opacity-60"
                } object-contain`}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/170x140?text=No+Image";
                }}
              />
            </div>
          ))}
        </div>
        <div className="w-[500px] h-[608px] bg-[#f5f5f5] p-10 rounded-lg outline-1 outline-[#d0d0d0] flex items-center justify-center">
          <img
            src={mainImage}
            alt={product.model || product.name}
            className="h-full object-contain"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x608?text=No+Image";
            }}
          />
        </div>
      </div>

      {/* RIGHT: Product Info */}
      <div className="flex flex-col max-w-[400px] gap-6">
        <div className="flex flex-col gap-2">
          <h5 className="text-[#a20009] font-semibold">{product.brand}</h5>
          <h2 className="text-2xl font-bold">
            {product.model || product.name}
          </h2>
          <h4 className="text-[#aaa] font-semibold">
            ${product.price?.toLocaleString()}
          </h4>
        </div>

        <p className="text-sm text-medium">{product.description}</p>
        <hr className="h-[2px] bg-black/30 border-none" />

        {/* Specifications */}
        {product.specifications &&
          Object.keys(product.specifications).length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h6 className="font-semibold mb-2">Specifications</h6>
              <div className="text-sm space-y-1">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Quantity & Actions */}
        <div className="flex flex-row gap-4">
          <div className="flex w-fit items-center gap-4 border border-black/40 rounded px-3 py-1.5">
            <span className="text-black text-base font-medium text-center">
              {quantity}
            </span>
            <div className="flex flex-col items-center justify-center gap-[2px]">
              <img
                src={upIcon}
                alt="Increase"
                className="w-4 h-4 cursor-pointer"
                onClick={handleIncrease}
              />
              <img
                src={downIcon}
                alt="Decrease"
                className="w-4 h-4 cursor-pointer"
                onClick={handleDecrease}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-start">
            <button
              onClick={() => addToWishlist(product)}
              className="p-4 w-[52px] rounded-full bg-white outline-1 outline-[#d0d0d0] cursor-pointer hover:bg-[#a20009] hover:text-white transition flex items-center justify-center"
            >
              <img
                src={wishlist}
                alt="wishlist"
                className="h-[14px] hover:filter hover:invert hover:brightness-0"
              />
            </button>
            <Button
              text="Add to Bag"
              iconRight={bag}
              onClick={handleAddToBag}
            />
          </div>
        </div>

        {/* Support Info */}
        <div className="flex flex-col gap-4 border-[2px] border-black/30 rounded px-6 py-5">
          <div className="flex items-center gap-4">
            <img src={deliveryTruck} className="w-10 h-10" alt="delivery" />
            <div>
              <h6 className="text-base font-semibold">Free Delivery</h6>
              <p className="text-xs font-medium">Free Delivery on all orders</p>
            </div>
          </div>
          <hr className="h-[2px] bg-black/30 border-none" />
          <div className="flex items-center gap-4">
            <img src={returnIcon} className="w-10 h-10" alt="return" />
            <div>
              <h6 className="text-base font-semibold">Return Delivery</h6>
              <p className="text-xs font-medium">
                Free 30 Days Delivery Returns.{" "}
                <span className="underline">Details</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
