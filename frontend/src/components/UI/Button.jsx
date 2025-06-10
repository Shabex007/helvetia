import React from "react";
import arrowIcon from "../../assets/arrow.svg";

const Button = ({
  text,
  onClick,
  iconLeft,
  iconRight = arrowIcon,
  className = "",
  style = {},
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      style={style}
      className={`w-fit self-start whitespace-nowrap inline-flex items-center justify-center gap-3 rounded-full border border-[#d0d0d0] px-6 py-4 text-sm font-semibold bg-white text-black hover:bg-[#a20009] hover:text-white transition-all group cursor-pointer ${className}`}
    >
      {iconLeft && (
        <img
          src={iconLeft}
          alt="left icon"
          className="h-[14px] order-[-1] group-hover:filter group-hover:brightness-0 group-hover:invert"
        />
      )}
      <span>{text}</span>
      {iconRight && (
        <img
          src={iconRight}
          alt="right icon"
          className="h-[14px] order-[1] group-hover:filter group-hover:brightness-0 group-hover:invert"
        />
      )}
    </button>
  );
};

export default Button;
