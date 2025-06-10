import React from "react";
import { useShop } from "../../context/ShopContext";
import WishlistCard from "../UI/WishlistCard";
import Button from "../UI/Button";

const WishlistGrid = () => {
  const { wishlistItems } = useShop();

  return (
    <section className="w-full flex flex-col justify-start items-center gap-[40px] py-[40px]">
      <div className="w-full max-w-[1300px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,2vw,32px)] box-border">
        {wishlistItems.length === 0 ? (
          <h2 className="col-span-full text-center text-lg font-medium">
            Your Wishlist is Empty
          </h2>
        ) : (
          wishlistItems.map((item) => (
            <WishlistCard key={item.id} item={item} />
          ))
        )}
      </div>
      <Button text="Return To Shop" onClick={() => window.history.back()} />
    </section>
  );
};

export default WishlistGrid;
