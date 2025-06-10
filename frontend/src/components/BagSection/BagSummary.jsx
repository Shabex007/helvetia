import React from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const BagSummary = () => {
  const navigate = useNavigate();
  const { bagItems } = useShop();

  const cost = bagItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-[400px] flex flex-col gap-8">
      <div className="bg-white rounded-[24px]  outline-1 outline-[#d0d0d0] p-6 flex flex-col gap-6">
        <h3 className="text-2xl font-semibold font-montserrat text-black leading-[28.8px]">
          Order Summary
        </h3>
        <div className="flex flex-col gap-2 text-[#696969] text-base font-semibold font-montserrat">
          <div className="flex justify-between">
            <span>Cost</span>
            <span>${cost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>On Checkout</span>
          </div>
          <div className="flex justify-between text-black">
            <span>Total</span>
            <span>${cost.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-black text-white text-sm font-medium font-montserrat rounded-full px-6 py-3 cursor-pointer hover:bg-[#a20009] transition-colors duration-300 flex items-center justify-center"
      >
        Checkout
      </button>
    </div>
  );
};

export default BagSummary;
