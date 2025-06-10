import React from "react";
import banner from "../assets/banner.png";
import ProductList from "../components/Product/ProductList";

const Collection = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Banner */}
      <div className="w-full flex items-center justify-center mb-[50px]">
        <div className="w-full max-w-[1300px] px-[50px] py-[40px] bg-[#1d473f] rounded-[24px] overflow-hidden flex flex-col items-center justify-center gap-[10px]">
          <img
            src={banner}
            alt="Watches Banner"
            className="w-full max-w-[870px] max-h-[529.09px]"
          />
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default Collection;
