import React from "react";
import "./Header.css";
import searchIcon from "../../assets/search-icon.svg";

const SearchBar = () => {
  return (
    <div className="search-container">
      <input type="text" placeholder="Search" className="search-input" />
      <img src={searchIcon} alt="Search" className="search-icon" />
    </div>
  );
};

export default SearchBar;
