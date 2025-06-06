import React from "react";
import "./Header.css";
import SearchBar from "./SearchBar";
import logo from "../../assets/logo.svg";
import bag from "../../assets/bag.svg";
import menuicon from "../../assets/menu.svg";
import user from "../../assets/user.svg";
import wishlist from "../../assets/wishlist.svg";

const Header = () => {
  //   const [menu, setMenu] = useState("Home");

  return (
    <header className="header">
      {/* Top section */}
      <nav className="nav-top">
        <button className="nav-btn menu-btn">
          <img src={menuicon} alt="menu" className="menu" />
        </button>

        <img src={logo} alt="logo" className="logo" />

        <div className="nav-btn-wrapper ">
          <button className="nav-btn" style={{ position: "relative" }}>
            <img src={wishlist} alt="wishlist" className="nav-icon" />
            <div className="nav-btn-counter">0</div>
          </button>

          <button className="nav-btn" style={{ position: "relative" }}>
            <img src={bag} alt="cart" className="nav-icon" />
            <div className="nav-btn-counter">0</div>
          </button>
          <button className="nav-btn">
            <img src={user} alt="user" className="nav-icon" />
          </button>
        </div>
      </nav>

      <nav className="nav-bottom">
        <button
          className="nav-link"
          onClick={() => {
            setMenu("About");
          }}
        >
          About
        </button>
        <button
          className="nav-link"
          onClick={() => {
            setMenu("FAQ's");
          }}
        >
          FAQ’s
        </button>
        <button
          className="nav-link"
          onClick={() => {
            setMenu("T&C's");
          }}
        >
          T&C's
        </button>
        <div className="search-bar-wrapper">
          <SearchBar />
        </div>
        <button
          className="nav-link"
          onClick={() => {
            setMenu("Watches");
          }}
        >
          Watches
        </button>
      </nav>
    </header>
  );
};

export default Header;
