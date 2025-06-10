// components/BrandSection.jsx
import React from "react";
import BrandCard from "../UI/BrandCard";
import brandData from "../../data/brands";

const BrandSection = () => {
  return (
    <section className="py-10 flex flex-col items-center gap-10 box-border">
      <h2 className="text-xl font-bold text-center">
        SHOP YOUR FAVOURITE BRANDS
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[clamp(16px,2vw,32px)] w-full max-w-[1300px] px-4">
        {brandData.map(({ id, logo }) => (
          <BrandCard key={id} logo={logo} />
        ))}
      </div>
    </section>
  );
};

export default BrandSection;
