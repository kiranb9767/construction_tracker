
import deleteIcon from "../../asset/delete.svg";
import editIcon from "../../asset/edit.svg";

const ItemList = ({ items, onEdit, onDelete, addItem, itemType }) => {
  return (
    <div className="h-[280px] flex flex-col pr-2 custom-scrollbar scrollbar-color-blue-500 scrollbar-thickness-2 bg-white border border-gray-800 shadow-sm rounded p-4">
      <button
        onClick={() => addItem(itemType)}
        className="justify-start w-[100px] py-2 mb-3 text-sm font-medium bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition hover:ring-2 hover:ring-blue-600 hover:ring-offset-2"
      >
        + {itemType === "materials" ? "Material" : "Labour"}
      </button>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-600">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b border-gray-200">
              <th className="px-2 py-2">No</th>

              {itemType === "materials" ? (
                <>
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">Qty</th>
                  <th className="px-2 py-2">Unit</th>
                  <th className="px-2 py-2">Price</th>
                  <th className="px-2 py-2">Brand</th>
                  <th className="px-2 py-2">Purchase</th>
                  <th className="px-2 py-2">Payment</th>
                  <th className="px-2 py-2">Mode</th>
                  <th className="px-2 py-2">Actions</th>
                </>
              ) : (
                <>
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">Type</th>
                  <th className="px-2 py-2">Salary</th>
                  <th className="px-2 py-2">Date</th>
                  <th className="px-2 py-2">Mode</th>
                  <th className="px-2 py-2">Actions</th>
                </>
              )}
            </tr>
          </thead>

          <tbody >
            {items.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-100 odd:bg-white even:bg-gray-50 hover:bg-indigo-50 transition">
                <td className="px-2 py-2">{index + 1}</td>

                {itemType === "materials" ? (
                  <>
                    <td className="px-2 py-2">{item.name}</td>
                    <td className="px-2 py-2">{item.quantity}</td>
                    <td className="px-2 py-2">{item.unit}</td>

                    <td className="px-2 py-2 text-emerald-600">₹{item.price}</td>

                    <td className="px-2 py-2">{item.brand}</td>

                    <td className="px-2 py-2 text-xs text-gray-500">
                      {item.dateOfPurchase?.split("T")[0]}
                    </td>

                    <td className="px-2 py-2 text-xs text-gray-500">
                      {item.dateOfPayment?.split("T")[0]}
                    </td>

                    <td className="px-2 py-2 text-green-600 text-xs">
                      {item.mediumofPayment}
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-2 py-2">{item.name}</td>
                    <td className="px-2 py-2">{item.labourType}</td>

                    <td className="px-2 py-2 text-indigo-600">
                      ₹{item.salary}
                    </td>

                    <td className="px-2 py-2 text-xs text-gray-500">
                      {item.date?.split("T")[0]}
                    </td>

                    <td className="px-2 py-2 text-green-600 text-xs">
                      {item.mediumofPayment}
                    </td>
                  </>
                )}

                <td className="px-2 py-2">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => onEdit(itemType, item._id)}
                      className="bg-indigo-200 rounded-3xl p-1 hover:ring-1 hover:ring-indigo-800 hover:ring-offset-1 hover:bg-indigo-400 transition  "
                    >
                      <img src={editIcon} className="w-4 h-4 justify-center" />
                    </button>

                    <button
                      onClick={() => onDelete(itemType, item._id)}
                      className="bg-red-200 rounded-3xl p-1 hover:ring-1 hover:ring-red-800 hover:ring-offset-1 hover:bg-red-400 transition  "
                    >
                      <img src={deleteIcon} className="w-4 h-4 flex justify-center" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemList;
