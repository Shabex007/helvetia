import React from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import BagCard from "./BagCard";
import Button from "../Button/Button";

const BagDisplay = () => {
  const { bagItems } = useShop();

  return (
    <div className="bag-items">
      {bagItems.length === 0 ? (
        <h2>Your Bag is Empty</h2>
      ) : (
        bagItems.map((item) => <BagCard key={item.id} item={item} />)
      )}
      <Button text="Return To Shop" onClick={() => window.history.back()} />
    </div>
  );
};

export default BagDisplay;
