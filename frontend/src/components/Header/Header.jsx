import React from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

import SearchBar from "../UI/SearchBar";
import IconButton from "../UI/IconButton";
import NavLink from "../UI/NavLink";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu";

import logo from "../../assets/logo.svg";
import bag from "../../assets/bag.svg";
import user from "../../assets/user.svg";
import wishlist from "../../assets/wishlist.svg";

const Header = () => {
  const navigate = useNavigate();
  const { bagItems, wishlistItems } = useShop();
  const totalItems = bagItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="w-full py-[30px] flex flex-col gap-6 box-border items-center">
      {/* Top section */}
      <nav className="relative h-11 w-full max-w-[1300px]">
        <HamburgerMenu />

        <img
          src={logo}
          alt="helvetia-logo"
          className="absolute top-[10px] left-1/2 transform -translate-x-1/2 h-6 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="absolute right-0 top-0 flex gap-[14px]">
          <IconButton
            icon={wishlist}
            alt="wishlist"
            onClick={() => navigate("/wishlist")}
            counter={wishlistItems.length}
          />
          <IconButton
            icon={bag}
            alt="cart"
            onClick={() => navigate("/bag")}
            counter={totalItems}
          />
          <IconButton
            icon={user}
            alt="user"
            onClick={() => navigate("/myaccount")}
          />
        </div>
      </nav>

      {/* Bottom navigation */}
      <nav className="flex items-center justify-center gap-[14px] w-full max-w-[1300px] flex-wrap sm:flex-row sm:flex-wrap sm:justify-between sm:gap-y-[10px]">
        <div className="flex-1 min-w-[150px] max-w-full ">
          <SearchBar />
        </div>
        <NavLink onClick={() => navigate("/about")}>About</NavLink>
        <NavLink onClick={() => navigate("/faq")}>FAQ's</NavLink>
        <NavLink onClick={() => navigate("/terms")}>T&C's</NavLink>

        <NavLink onClick={() => navigate("/watches")}>Watches</NavLink>
      </nav>
    </header>
  );
};

export default Header;
