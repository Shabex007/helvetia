import React from "react";
import { useShop } from "../../context/ShopContext";
import BagCard from "../UI/BagCard";
import Button from "../UI/Button";

const BagDisplay = () => {
  const { bagItems } = useShop();

  return (
    <div className="flex flex-col gap-10 flex-1">
      {bagItems.length === 0 ? (
        <h2 className="text-xl font-semibold text-black">Your Bag is Empty</h2>
      ) : (
        bagItems.map((item) => <BagCard key={item.id} item={item} />)
      )}
      <Button
        text="Return To Shop"
        onClick={() => window.history.back()}
        className="w-fit px-6 py-4 text-sm font-semibold text-black bg-white border border-[#d0d0d0] rounded-full hover:text-[#a20009]"
      />
    </div>
  );
};

export default BagDisplay;
