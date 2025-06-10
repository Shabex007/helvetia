import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

import SearchBar from "./SearchBar";
import logo from "../../assets/logo.svg";
import bag from "../../assets/bag.svg";
import menuicon from "../../assets/menu.svg";
import user from "../../assets/user.svg";
import wishlist from "../../assets/wishlist.svg";

const Header = () => {
  const navigate = useNavigate();
  const { bagItems, wishlistItems } = useShop();
  const totalItems = bagItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      {/* Top section */}
      <nav className="nav-top">
        <button className="nav-btn menu-btn">
          <img src={menuicon} alt="menu" className="menu" />
        </button>

        <img
          src={logo}
          alt="helvetia-logo"
          className="helvetia-logo"
          onClick={() => navigate("/")}
        />

        <div className="nav-btn-wrapper ">
          <button
            className="nav-btn"
            style={{ position: "relative" }}
            onClick={() => navigate("/wishlist")}
          >
            <img src={wishlist} alt="wishlist" className="nav-icon" />
            <div className="nav-btn-counter">{wishlistItems.length}</div>
          </button>

          <button
            className="nav-btn"
            style={{ position: "relative" }}
            onClick={() => navigate("/bag")}
          >
            <img src={bag} alt="cart" className="nav-icon" />
            <div className="nav-btn-counter">{totalItems}</div>
          </button>
          <button className="nav-btn">
            <img src={user} alt="user" className="nav-icon" />
          </button>
        </div>
      </nav>

      <nav className="nav-bottom">
        <button className="nav-link" onClick={() => navigate("/about")}>
          About
        </button>
        <button className="nav-link" onClick={() => navigate("/faq")}>
          FAQ’s
        </button>
        <button className="nav-link" onClick={() => navigate("/terms")}>
          T&C's
        </button>
        <div className="search-bar-wrapper">
          <SearchBar />
        </div>
        <button className="nav-link" onClick={() => navigate("/watches")}>
          Watches
        </button>
      </nav>
    </header>
  );
};

export default Header;
