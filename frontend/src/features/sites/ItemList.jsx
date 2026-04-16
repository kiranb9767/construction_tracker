import AddItemModelForm from "../../components/AddItemModelForm";
import { useState } from "react";

import deleteIcon from "../../asset/delete.svg";
import editIcon from "../../asset/edit.svg";

const ItemList = ({ items, onEdit, onDelete, addItem, itemType }) => {


  return (
    <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar scrollbar-color-blue-500 scrollbar-thickness-2 rounded-x1 shadow-sm border border-red-100 p-3 bg-red-100 ">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center justify-between px-3 py-2 border-b last:border-none hover:bg-red-500 transition"
        >
          <div className="flex items-center gap-2 text-sm text-gray-700 w-full overflow-hidden">
            <span className="w-2 font-medium">{index + 1}</span>
            {itemType === "materials" ? (
              <>
                <span className="font-medium text-gray-900 w-full truncate">{item.name}</span>
                <span className="w-full">Qty: {item.quantity}</span>
                <span className="w-full text-blue-600 font-medium">{item.price}</span>
                <span className="w-full truncate">{item.brand}</span>
                <span className="w-full">{item.dateOfPurchase}</span>
                <span className="w-full">{item.dateOfPayment}</span>
                <span className="w-full text-green-600 font-medium">{item.mediumofPayment}</span>
              </>
            ) : (
              <>
                <span className="font-medium text-gray-900 w-32 truncate">{item.name}</span>
                <span className="w-20">₹{item.salary}</span>
                <span className="w-28">{item.date}</span>
                <span className="w-24 text-green-600 font-medium">{item.mediumofPayment}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 ml-4 shrink-0">
            <button
              onClick={() => onEdit(itemType, item.id)}
              className="text-blue-600 text-xs font-medium hover:underline"
            >
              <img src={editIcon} alt="Edit" className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(itemType, item.id)}
              className="text-red-500 text-xs font-medium hover:underline"
            >
              <img src={deleteIcon} alt="Delete" className="w-4 h-4 hover:underline" />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => addItem(itemType)}
        className="mt-3 w-full py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        + Add {itemType === "materials" ? "Material" : "Labour"}
      </button>

    </div>
  );
};

export default ItemList;
