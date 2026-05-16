import React from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthContext";

const BagSummary = () => {
  const navigate = useNavigate();
  const { bagItems } = useShop();
  const { isAuthenticated } = useAuth();

  const subtotal = bagItems.reduce(
    (acc, item) => acc + (item.product?.price || item.price) * item.quantity,
    0,
  );

  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col gap-8">
      <div className="bg-white rounded-[24px] outline-1 outline-[#d0d0d0] p-6 flex flex-col gap-6">
        <h3 className="text-2xl font-semibold font-montserrat text-black leading-[28.8px]">
          Order Summary
        </h3>
        <div className="flex flex-col gap-2 text-[#696969] text-base font-semibold font-montserrat">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-black pt-2 border-t">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-black text-white text-sm font-medium font-montserrat rounded-full px-6 py-3 cursor-pointer hover:bg-[#a20009] transition-colors duration-300 flex items-center justify-center"
        disabled={bagItems.length === 0}
      >
        {!isAuthenticated ? "Login to Checkout" : "Proceed to Checkout"}
      </button>
    </div>
  );
};

export default BagSummary;
