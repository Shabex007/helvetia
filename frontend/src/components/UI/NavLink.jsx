// components/NavLink.jsx
import React from "react";

const NavLink = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#f0f0f0] px-6 py-5 rounded-[14px] text-sm font-medium text-black text-center transition hover:bg-[#a20009] hover:text-white cursor-pointer"
    >
      {children}
    </button>
  );
};

export default NavLink;
