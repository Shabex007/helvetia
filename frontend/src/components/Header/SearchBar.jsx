import React from "react";
import searchIcon from "../../assets/search-icon.svg";

const SearchBar = () => {
  return (
    <div className="inline-flex items-center justify-between px-6 py-5 bg-[#f0f0f0] rounded-xl border-none w-full box-border transition-all duration-300 hover:bg-white hover:shadow-[0_0_0_2px_rgba(0,0,0,0.2)] focus-within:bg-white focus-within:shadow-[0_0_0_2px_rgba(0,0,0,0.2)]">
      <input
        type="text"
        placeholder="Search"
        className="border-none outline-none bg-transparent text-base font-medium leading-[18px] text-black flex-1 w-full placeholder:text-black"
      />
      <img src={searchIcon} alt="Search" className="h-4" />
    </div>
  );
};

export default SearchBar;
