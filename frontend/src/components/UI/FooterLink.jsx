// components/FooterLink.jsx
import React from "react";

const FooterLink = ({ children, onClick }) => (
  <h6
    onClick={onClick}
    className="text-[14px] font-medium text-[#696969] leading-5 cursor-pointer hover:text-[#a20009] transition m-0"
  >
    {children}
  </h6>
);

export default FooterLink;
