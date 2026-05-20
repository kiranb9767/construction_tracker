import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import { Link } from "react-router-dom";

import deleteIcon from "../../asset/delete.svg";
import viewIcon from "../../asset/view.svg";
import { useState } from "react";

const SiteCard = ({
  name,
  location,
  owner,
  startDate,
  budget,
  spent,
  _id,
  handleDelete,
}) => {
  const PERCENTAGE = budget === 0 ? 0 : Math.round((spent / budget) * 100);
  const [isActive, setIsActive] = useState(true);
  return (
    <div
      className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-black/20 backdrop-blur shadow-sm 
                hover:shadow-2xl hover:-translate-y-6 transition-all duration-300"
    >
      <div className="relative px-5 pt-5 pb-4 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-white to-sky-50 opacity-80"></div>

        <div className="relative flex items-start justify-between">
          <div>
            <h4 className="text-xl font-bold tracking-tight text-slate-800">
              {name}
            </h4>

            <p className="text-xs text-slate-500 mt-1">Construction Site</p>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition cursor-pointer
              ${
                isActive
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-red-100 text-slate-500 border border-slate-200"
              }`}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? "Active" : "Inactive"}
          </div>
        </div>
      </div>

      <div className="px-5 py-5 space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Location</span>

          <span className="font-medium text-slate-700">{location}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500">Owner</span>

          <span className="font-medium text-slate-700">{owner}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500">Start Date</span>

          <span className="font-medium text-slate-700">
            {startDate?.split("T")[0]}
          </span>
        </div>

        <div className="h-px bg-slate-100 my-2"></div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500">Budget</span>

          <span className="font-semibold text-slate-800">₹{budget}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500">Spent</span>

          <span className="font-semibold text-rose-500">₹{spent}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500">Remaining</span>

          <span className="font-semibold text-emerald-600">
            ₹{budget - spent}
          </span>
        </div>

        <div className="pt-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <ProgressBar percentage={PERCENTAGE} />
            </div>

            <div className="min-w-[42px] text-right text-xs font-bold text-slate-700">
              {PERCENTAGE}%
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          flex items-center justify-between
          border-t border-slate-100
          px-5 py-4
          bg-slate-50/70
        "
      >
        <Link to={"/site/" + _id}>
          <Button
            className="
              rounded-xl
              bg-white
              border border-slate-200
              hover:border-indigo-300
              hover:bg-indigo-50
              transition
              shadow-sm
            "
          >
            <img src={viewIcon} alt="View" className="w-4 h-4 mr-1" />
          </Button>
        </Link>

        <Button
          className="
            rounded-xl
            bg-rose-50
            border border-rose-200
            hover:bg-rose-100
            hover:border-rose-300
            transition
            shadow-sm
          "
          onClick={() => handleDelete(_id)}
        >
          <img src={deleteIcon} alt="Delete" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SiteCard;
