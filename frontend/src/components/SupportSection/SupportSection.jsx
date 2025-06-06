import React from "react";
import SupportCard from "./SupportCard";
import "./SupportSection.css";

import shippingIcon from "../../assets/shipping.svg";
import serviceIcon from "../../assets/service.svg";
import authenticIcon from "../../assets/authentic.svg";

const supportItems = [
  {
    icon: shippingIcon,
    title: "FAST & FREE SHIPPING",
    subtitle: "Every single order ships for free.\nNo extra credit need",
  },
  {
    icon: serviceIcon,
    title: "24/7 CUSTOMER SUPPORT",
    subtitle: "Expert support anytime you need it.",
  },
  {
    icon: authenticIcon,
    title: "100% AUTHENTICITY",
    subtitle: "100% genuine watches with brand warranty.",
  },
];

const SupportSection = () => {
  return (
    <section className="support-section">
      <h2>WE ARE SUPPORTED BY</h2>
      <div className="support-grid">
        {supportItems.map((item, index) => (
          <SupportCard
            key={index}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </div>
    </section>
  );
};

export default SupportSection;
