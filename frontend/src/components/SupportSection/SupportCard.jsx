import React from "react";
import "./SupportSection.css";

const SupportCard = ({ icon, title, subtitle }) => {
  return (
    <div className="support-card">
      <img src={icon} alt="Support Icon" className="support-icon" />
      <div className="support-text">
        <h3 className="support-title">{title}</h3>
        <p className="support-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default SupportCard;
