import React from "react";
import BagDisplay from "../components/BagSection/BagDisplay";
import BagSummary from "../components/BagSection/BagSummary";

const Bag = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-[60px] py-[70px] px-4 box-border">
      <BagDisplay />
      <BagSummary />
    </div>
  );
};

export default Bag;
