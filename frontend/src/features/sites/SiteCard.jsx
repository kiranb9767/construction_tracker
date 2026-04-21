import React from "react";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import { Link } from "react-router-dom";
import deleteIcon from "../../asset/delete.svg";
import viewIcon from "../../asset/view.svg";
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

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-[0_10px_20px_10px_rgba(0,0,0,0.4)] transition">
      <div className="px-3 pt-3 pb-2 text-left text-lg font-bold text-gray-800 rounded-tl-xl rounded-tr-xl">
        <h4>{name}</h4>
      </div>
      <hr className="border-gray-800" />
      <div className="flex flex-col text-left px-6 py-4 text-sm ">
        <div className="flex justify-between">
          <span className="text-gray-800">Location</span>
          <span className="text-gray-800 font-medium">{location}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-800">Owner</span>
          <span className="text-gray-800 font-medium">{owner}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-800">Start Date</span>
          <span className="text-gray-800 font-medium">
            {startDate?.split("T")[0]}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-800">Budget</span>
          <span className="text-gray-800 font-medium">₹{budget}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-800">Spent</span>
          <span className="text-red-500 font-medium">₹{spent}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-800">Remaining</span>
          <span className="text-green-600 font-medium">
            ₹{budget - spent}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <ProgressBar percentage={PERCENTAGE} />
          <div className="w-10 text-right text-xs font-bold text-white">
            {PERCENTAGE}%
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between px-2 py-4">
        <Link to={"/site/" + _id}>
          <Button className="rounded-full hover:ring-2 hover:ring-blue-800 hover:ring-offset-2 transition">
            <img src={viewIcon} alt="View" className="w-4 h-4 mr-1" />
          </Button>
        </Link>
        <Button
          className="bg-red-400 hover:ring-2 hover:ring-red-600 hover:ring-offset-2  hover:bg-red-400 transition"
          onClick={() => handleDelete(_id)}
        >
          <img src={deleteIcon} alt="Delete" className="w-4 h-4 " />
        </Button>
      </div>
    </div>
  );
};

export default SiteCard;
