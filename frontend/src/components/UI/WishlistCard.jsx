import React from "react";
import { useShop } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import bag from "../../assets/bag.svg";
import bin from "../../assets/bin.svg";

const WishlistCard = ({ item }) => {
  const { removeFromWishlist, addToBag } = useShop();
  const navigate = useNavigate();

  const handleMoveToBag = () => {
    addToBag(item);
    removeFromWishlist(item.id);
    navigate("/bag");
  };

  return (
    <div className="min-w-[400px] p-5 bg-white rounded-[24px] border border-[#d0d0d0] flex flex-row justify-start items-start gap-8">
      <div className="w-[151px] h-[151px] bg-[#f5f5f5] rounded-[12px] border border-[#d0d0d0] flex justify-center items-center py-3">
        <img
          src={item.image}
          alt={item.model}
          onClick={() => navigate(`/product/${item.id}`)}
          className="h-full cursor-pointer"
        />
      </div>
      <div className="flex flex-col justify-between gap-8">
        <div className="flex flex-col gap-0">
          <h6 className="text-[#a20009] text-sm">{item.brand}</h6>
          <h4 className="text-lg font-semibold">{item.model}</h4>
          <h6 className="text-[#696969]">${item.price.toLocaleString()}</h6>
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
            onClick={() => removeFromWishlist(item.id)}
          >
            <img src={bin} alt="remove" className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
