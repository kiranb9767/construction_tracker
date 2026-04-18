import React from "react";
import Button from "../../components/Button";
import ProgressBar from "../../components/ProgressBar";
import { Link } from "react-router-dom";
import deleteIcon from "../../asset/delete.svg";
import viewIcon from "../../asset/view.svg";
const SiteCard = ({ name, location,owner,startDate, budget, spent, _id , handleDelete }) => {
  const PERCENTAGE = budget === 0 ? 0 : Math.round((spent / budget) * 100);

  return (
    <div className="bg-card shadow-md rounded-card hover:bg-red-200 transition">
      <div className="p-2 text-left text-cardTitle font-semibold text-gray-700 ">
        <h4>{name}</h4>
      </div>
      <hr className="border-gray-700" />
      <div className="flex flex-col text-left px-2 py-4">
        <div className="py-1">Location: {location}</div>
        <div className="py-1">Owner: {owner || "Not specified"}</div>
        <div className="py-1">Start Date: {startDate || "Not specified"}</div>
        <div className="py-1">Budget: {budget}</div>
        <div className="py-1" >Spent: {spent}</div>
        <div className="py-1">
            Remaining: {budget - spent} 
        </div>
        <div className="flex items-center gap-2">
          <ProgressBar percentage= {PERCENTAGE}/>
          <div className="w-10 text-right text-sm font-medium text-gray-600">{PERCENTAGE} %</div>
        </div>

      </div>

        <div className="flex flex-row justify-between px-2 py-4">
          <Link to={"/site/" + _id}>
            <Button className="rounded-full hover:bg-white transition"> 
              <img src={viewIcon} alt="View" className="w-4 h-4 mr-1" />
            </Button>
          </Link> 
           <Button className="rounded-full hover:bg-white transition" onClick={() => handleDelete(_id)}>
              <img src={deleteIcon} alt="Delete" className="w-4 h-4 " />
          </Button>
        </div>
    </div>
  );
};

export default SiteCard;
