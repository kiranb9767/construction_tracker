import { useState } from "react";

const EditItemModelForm = ({ itemType, onClose, onUpdate, initialData }) => {
  const [formData, setFormData] = useState({ ...initialData });
  console.log("Initial data for edit form:", initialData);
  console.log("Form data state in edit form:", formData);
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden
        bg-gradient-to-b from-[#2f2f2f] to-[#3a3a3a]
        border border-gray-600/50
        shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
      >
        <div
          className="px-5 py-4 flex justify-between items-center
          bg-gradient-to-r from-[#3a3a3a]/80 to-[#2f2f2f]/80
          border-b border-gray-600/40"
        >
          <h2 className="text-sm font-semibold text-gray-100 tracking-wide">
            Edit {itemType === "materials" ? "Material" : "Labour"}
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const updateItem = Object.fromEntries(formData);
            onUpdate(updateItem);
          }}
          className="flex flex-col"
        >
          <div className="p-5 flex flex-col gap-3">
            {itemType === "materials" ? (
              <>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  name="name"
                  placeholder="Material Name"
                  className="inputDarkPremium"
                  required
                />
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: Number(e.target.value),
                    })
                  }
                  name="quantity"
                  placeholder="Quantity"
                  className="inputDarkPremium"
                  required
                />
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: Number(e.target.value) })
                  }
                  name="unit"
                  placeholder="Unit"
                  className="inputDarkPremium"
                  required
                />
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  name="price"
                  placeholder="Price"
                  className="inputDarkPremium"
                  required
                />
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  name="brand"
                  placeholder="Brand"
                  className="inputDarkPremium"
                  required
                />
                <input
                  type="text"
                  value={formData.dateOfPurchase?.split("T")[0] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfPurchase: e.target.value })
                  }
                  name="dateOfPurchase"
                  placeholder="Date of Purchase"
                  className="inputDarkPremium"
                  required
                />
                <input
                  type="text"
                  value={formData.dateOfPayment?.split("T")[0] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, dateOfPayment: e.target.value })
                  }
                  name="dateofPayment"
                  placeholder="Date of Payment"
                  className="inputDarkPremium"
                  required
                />
                <select
                  value={formData.mediumofPayment}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mediumofPayment: e.target.value,
                    })
                  }
                  name="mediumofPayment"
                  className="inputDarkPremium"
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                </select>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  name="name"
                  placeholder="Labour Name"
                  className="inputDarkPremium"
                  required
                />
                <input
                  type="text"
                  value={formData.labourType}
                  onChange={(e) =>
                    setFormData({ ...formData, labourType: e.target.value })
                  }
                  name="labourType"
                  placeholder="Labour Type"
                  className="inputDarkPremium"
                  required
                />
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: Number(e.target.value) })
                  }
                  name="salary"
                  placeholder="Salary"
                  className="inputDarkPremium"
                  required
                />
                <input
                  type="text"
                  value={formData.date?.split("T")[0] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  name="date"
                  placeholder="Date"
                  className="inputDarkPremium"
                  required
                />
                <select
                  value={formData.mediumofPayment}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mediumofPayment: e.target.value,
                    })
                  }
                  name="mediumofPayment"
                  className="inputDarkPremium"
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                </select>
              </>
            )}
          </div>
        </form>
        <div
          className="px-5 py-4 flex justify-end gap-3
            bg-gradient-to-r from-[#3a3a3a]/80 to-[#2f2f2f]/80
            border-t border-gray-600/40"
        >
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full
              bg-gray-600 border border-gray-500
              text-gray-200
              hover:bg-gray-600 transition
              hover:ring-2 hover:ring-gray-600 hover:ring-offset-2 hover:ring-offset-[#2f2f2f]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-full
              bg-blue-600 text-white
              shadow-[0_6px_20px_rgba(0,0,0,0.5)]
              hover:bg-blue-700
              hover:ring-2 hover:ring-blue-600 hover:ring-offset-2 hover:ring-offset-[#2f2f2f]
              transition"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModelForm;
