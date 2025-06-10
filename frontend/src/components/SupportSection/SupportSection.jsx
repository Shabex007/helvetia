import React from "react";
import SupportCard from "../UI/SupportCard";

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
    <section className="py-[50px] flex flex-col items-center gap-[50px] box-border">
      <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-center">
        WE ARE SUPPORTED BY
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[clamp(20px,2vw,40px)] w-full max-w-[1300px]">
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
