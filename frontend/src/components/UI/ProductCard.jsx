import React from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { getImageUrl } from "../../utils/imageHelper";
import wishlist from "../../assets/wishlist.svg";
import bag from "../../assets/bag.svg";
import Button from "../UI/Button";

const ProductCard = ({ id, slug, brand, model, price, image }) => {
  const navigate = useNavigate();
  const { addToBag, addToWishlist, isInWishlist } = useShop();

  const imageUrl = getImageUrl(image);

  const handleAddToBag = () => {
    const product = { id, slug, brand, model, price, image: imageUrl };
    addToBag(product);
    navigate("/bag");
  };

  return (
    <div className="bg-[#f3f3f3] rounded-[24px] px-[clamp(16px,2vw,20px)] py-[clamp(16px,2vw,20px)] flex flex-col items-center justify-between gap-5">
      <div className="w-full flex flex-col gap-1">
        <h6 className="!text-[#a20009] text-sm font-bold">{brand}</h6>
        <div className="flex justify-between items-center w-full">
          <h4 className="uppercase font-bold">{model}</h4>
          <h5 className="text-black font-bold text-base">
            ${price.toLocaleString()}
          </h5>
        </div>
      </div>

      <img
        src={imageUrl}
        alt={model}
        onClick={() => navigate(`/product/${slug || id}`)}
        className="w-[212px] h-[304px] object-contain cursor-pointer"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/212x304?text=No+Image";
        }}
      />

      <div className="flex justify-end items-center w-full gap-3">
        <button
          onClick={() =>
            addToWishlist({ id, slug, brand, model, price, image: imageUrl })
          }
          className={`p-4 rounded-full outline-1 outline-[#d0d0d0] cursor-pointer transition ${
            isInWishlist(id)
              ? "bg-[#a20009] text-white"
              : "bg-white hover:bg-[#a20009] hover:text-white"
          }`}
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
          className="py-[14px] px-5 gap-2"
        />
      </div>
    </div>
  );
};

export default ProductCard;
