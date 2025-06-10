import React from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import BagDisplay from "../components/Bag/BagDisplay";
import BagSummary from "../components/Bag/BagSummary";
import "./styles/Bag.css";

const Bag = () => {
  return (
    <div className="bag-content">
      <BagDisplay />
      <BagSummary />
    </div>
  );
};

export default Bag;
