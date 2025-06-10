// components/IconButton.jsx
import React from "react";
import clsx from "clsx";

const IconButton = ({
  icon,
  alt,
  onClick,
  counter,
  className = "",
  iconClassName = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative w-11 h-11 rounded-full border border-[#d0d0d0] flex items-center justify-center bg-transparent hover:bg-[#a20009] transition-all group cursor-pointer",
        className
      )}
    >
      <img
        src={icon}
        alt={alt}
        className={clsx(
          "h-[18px] group-hover:invert group-hover:brightness-0",
          iconClassName
        )}
      />
      {typeof counter !== "undefined" && (
        <div className="absolute top-[-7px] left-[28px] bg-[#a20009] text-white text-xs font-medium rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
          {counter}
        </div>
      )}
    </button>
  );
};

export default IconButton;
