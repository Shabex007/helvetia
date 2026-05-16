import React from "react";
import { useShop } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/imageHelper";
import bag from "../../assets/bag.svg";
import bin from "../../assets/bin.svg";

const WishlistCard = ({ item }) => {
  const { removeFromWishlist, addToBag } = useShop();
  const navigate = useNavigate();

  // Get product from item (the API returns item.product)
  const product = item.product || item;
  const productId = product.id;
  const productSlug = product.slug; // Now we can access slug
  const imageUrl = getImageUrl(product.thumbnail || product.images?.[0]);

  const handleMoveToBag = () => {
    addToBag(product);
    removeFromWishlist(productId);
    navigate("/bag");
  };

  return (
    <div className="min-w-[400px] p-5 bg-white rounded-[24px] border border-[#d0d0d0] flex flex-row justify-start items-start gap-8">
      <div className="w-[151px] h-[151px] bg-[#f5f5f5] rounded-[12px] border border-[#d0d0d0] flex justify-center items-center py-3">
        <img
          src={imageUrl}
          alt={product.model || product.name}
          onClick={() => navigate(`/product/${productSlug || productId}`)}
          className="h-full cursor-pointer object-contain"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/151x151?text=No+Image";
          }}
        />
      </div>
      <div className="flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-0">
          <h6 className="text-[#a20009] text-sm">{product.brand}</h6>
          <h4 className="text-lg font-semibold">
            {product.model || product.name}
          </h4>
          <h6 className="text-[#696969]">${product.price.toLocaleString()}</h6>
        </div>
        <div className="flex gap-[14px]">
          <button
            className="p-2.5 rounded-[4px] border border-[#d0d0d0] flex justify-center items-center cursor-pointer"
            onClick={handleMoveToBag}
          >
            <img src={bag} alt="cart" className="w-[18px] h-[18px]" />
          </button>
          <button
            className="p-2.5 rounded-[4px] border border-[#d0d0d0] flex justify-center items-center cursor-pointer"
            onClick={() => removeFromWishlist(productId)}
          >
            <img src={bin} alt="remove" className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
