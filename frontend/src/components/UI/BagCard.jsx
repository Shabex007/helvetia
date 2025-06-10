import React from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import closeIcon from "../../assets/close.svg";
import upIcon from "../../assets/up.svg";
import downIcon from "../../assets/down.svg";

const BagCard = ({ item }) => {
  const navigate = useNavigate();
  const { updateBagQuantity, removeFromBag } = useShop();

  return (
    <div className="flex gap-8 p-5 bg-white rounded-[24px] outline-1 outline-[#d0d0d0]">
      <div className="w-[130px] h-[130px] bg-[#f5f5f5] rounded-[12px] outline-1 outline-[#d0d0d0] flex items-end justify-center py-3">
        <img
          src={item.image}
          alt={item.model}
          className="w-[72.57px] h-auto object-contain cursor-pointer"
          onClick={() => navigate(`/product/${item.id}`)}
        />
      </div>

      <div className="flex flex-col gap-8 flex-1">
        <div className="flex justify-between gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[#a20009] text-sm font-bold font-montserrat leading-[21px]">
              {item.brand}
            </span>
            <h4 className="uppercase text-black text-2xl font-bold font-montserrat leading-[36px]">
              {item.model}
            </h4>
            <p className="text-[#696969] text-base font-semibold uppercase font-montserrat leading-[24px]">
              ${item.price.toLocaleString()}
            </p>
          </div>
          <img
            src={closeIcon}
            alt="Remove"
            className="w-6 h-6 cursor-pointer"
            onClick={() => removeFromBag(item.id)}
          />
        </div>

        <div className="flex justify-between items-end">
          {/* Quantity selector */}
          <div className="flex items-center gap-4 border border-black/40 rounded px-3 py-1.5">
            <span className="text-black text-base font-medium text-center">
              {item.quantity}
            </span>
            <div className="flex flex-col items-center justify-center gap-[2px]">
              <img
                src={upIcon}
                alt="Increase"
                className="w-4 h-4 cursor-pointer"
                onClick={() =>
                  updateBagQuantity(item.id, Math.min(10, item.quantity + 1))
                }
              />
              <img
                src={downIcon}
                alt="Decrease"
                className="w-4 h-4 cursor-pointer"
                onClick={() =>
                  updateBagQuantity(item.id, Math.max(1, item.quantity - 1))
                }
              />
            </div>
          </div>

          {/* Total price */}
          <div className="flex items-center gap-2 text-base font-semibold text-black capitalize font-montserrat">
            <span>Total</span>
            <span>${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagCard;
