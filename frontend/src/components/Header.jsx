import React from "react";
import bg from "../asset/construction-background.svg";
import logo from "../asset/Site_Logo.png";

const Header = () => {
  return (
    <div className="relative bg-white border-b border-gray-300 overflow-hidden">
      <img src={bg} className="absolute w-full h-full opacity-50 object-cover" />

      <div className="flex flex-col px-2 items-left">
        <img src={logo} className="w-20 h-20 rounded-xl" />

        <span className="text-2xl font-bold text-gray-800 mb-4 text-left font-serif italic tracking-wide text-shadow-lg">
          Construction Expense Tracker
        </span>
      </div>
    </div>
  );
};

export default Header;
