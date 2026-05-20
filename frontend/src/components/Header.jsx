import React from "react";
import bg from "../asset/construction-background.svg";
import logo from "../asset/Site_Logo.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="relative overflow-hidden border-b shadow-sm border-slate-200 bg-gradient-to-r from-white via-slate-50 to-indigo-50">
      <img
        src={bg}
        className="absolute inset-0 h-full w-full object-cover opacity-[0.06]"
      />

      <div className="relative z-10 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4">
          <div className="p-2 shadow-md rounded-2xl bg-white/90 ring-1 ring-slate-200 backdrop-blur">
            <img
              src={logo}
              className="object-cover w-16 h-16 rounded-xl"
              alt="Logo"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
              Construction Expense Tracker
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Smart site expense management dashboard
            </p>
          </div>
        </div>
        <div className="relative flex flex-col items-center pl-4 ml-1 border-l group border-slate-200">
          <button
            type="button"
            className="px-5 py-2.5 bg-slate-800 text-white font-medium rounded-xl flex items-center justify-center hover:bg-slate-900 hover:ring-2 
              hover:ring-red-600 
              hover:ring-offset-2 transition"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
          <span className="px-2 py-1 mt-1 text-xs text-white transition bg-gray-600 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
