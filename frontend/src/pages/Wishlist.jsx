import React from "react";
import WishlistGrid from "../components/Wishlist/WishlistGrid";

const Wishlist = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-[40px] py-[40px]">
      <WishlistGrid />
    </div>
  );
};

export default Wishlist;
