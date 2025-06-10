// components/FooterPolicyLink.jsx
import React from "react";

const FooterPolicyLink = ({ children, onClick }) => (
  <p
    onClick={onClick}
    className="text-[12px] font-medium text-[#696969] leading-7 cursor-pointer hover:text-[#a20009] transition"
  >
    {children}
  </p>
);

export default FooterPolicyLink;
