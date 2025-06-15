import React, { useState } from "react";
import "./HamburgerMenu.css";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Custom Hamburger Button */}
      <div
        onClick={toggleMenu}
        className="relative w-11 h-11 rounded-full border border-[#d0d0d0] flex items-center justify-center bg-transparent hover:bg-[#a20009] transition-all cursor-pointer z-50"
      >
        <div id="hamburgermenu" className={isOpen ? "open" : ""}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Slide-In Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-6 mt-20">
          {["Blog", "Contact", "Social", "Careers", "Newsletter"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-lg font-medium text-gray-700 hover:text-[#a20009] transition-colors"
              >
                {link}
              </a>
            )
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default HamburgerMenu;
