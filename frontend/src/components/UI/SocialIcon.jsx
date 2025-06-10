// components/SocialIcon.jsx
import React from "react";

const SocialIcon = ({ icon, alt }) => (
  <img
    src={icon}
    alt={alt}
    className="cursor-pointer hover:opacity-80 transition"
  />
);

export default SocialIcon;
