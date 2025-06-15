import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import searchIcon from "../../assets/search-icon.svg";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const { setSearchQuery } = useShop();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = input.trim();
    if (query.length === 0) return;

    setSearchQuery(query);
    navigate("/watches");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center justify-between px-6 py-5 bg-[#f0f0f0] rounded-xl border-none w-full box-border transition-all duration-300 hover:bg-white hover:shadow-[0_0_0_2px_rgba(0,0,0,0.2)] focus-within:bg-white focus-within:shadow-[0_0_0_2px_rgba(0,0,0,0.2)]"
    >
      <input
        type="text"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 w-full bg-transparent outline-none text-black font-medium text-base placeholder:text-black"
      />
      <button type="submit">
        <img src={searchIcon} alt="Search" className="h-4" />
      </button>
    </form>
  );
};

export default SearchBar;
