// components/BrandCard.jsx
import React from "react";

const BrandCard = ({ logo }) => {
  return (
    <div className="bg-[#f2f2f2] rounded-[24px] flex items-center justify-center transition-transform duration-300 hover:scale-[1.03] aspect-[2/1] px-[clamp(40px,6vw,100px)] py-[clamp(20px,3vw,40px)]">
      <img
        src={logo}
        alt="brand logo"
        className="w-[clamp(80px,8vw,110px)] h-auto object-contain"
      />
    </div>
  );
};

export default BrandCard;
