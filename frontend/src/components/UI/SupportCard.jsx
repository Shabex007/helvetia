import React from "react";

const SupportCard = ({ icon, title, subtitle }) => {
  return (
    <div className="bg-[#f3f3f3] rounded-[24px] px-[clamp(20px,2vw,30px)] py-[clamp(20px,2vw,30px)] flex flex-col items-center gap-5 text-center">
      <img
        src={icon}
        alt={`${title} icon`}
        className="w-[clamp(40px,6vw,70px)] h-[clamp(40px,6vw,70px)] object-contain"
      />
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mt-[clamp(8px,1vw,16px)] mb-1">
          {title}
        </h3>
        <p className="text-[#696969] text-[clamp(12px,1.5vw,14px)] font-semibold leading-[1.5] whitespace-pre-line text-center font-montserrat m-0">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default SupportCard;
