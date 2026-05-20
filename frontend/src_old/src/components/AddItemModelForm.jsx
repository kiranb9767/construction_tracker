import { useState } from "react";

const AddItemModelForm = ({ itemType, onClose, onAdd }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = (data) => {
    setErrorMessage("");

    if (!data.name?.trim()) {
      return "Name is required";
    }

    if (itemType === "materials") {
      if (!data.quantity || Number(data.quantity) <= 0) {
        return "Quantity must be greater than 0";
      }

      if (!data.unit?.trim()) {
        return "Unit is required";
      }

      if (!data.price || Number(data.price) <= 0) {
        return "Price must be greater than 0";
      }

      if (!data.brand?.trim()) {
        return "Brand is required";
      }

      if (!data.dateOfPurchase) {
        return "Purchase date is required";
      }

      if (!data.dateOfPayment) {
        return "Payment date is required";
      }

      if (!data.mediumofPayment) {
        return "Select payment method";
      }
    } else {
      if (!data.labourType?.trim()) {
        return "Labour type is required";
      }

      if (!data.salary || Number(data.salary) <= 0) {
        return "Salary must be greater than 0";
      }

      if (!data.date) {
        return "Date is required";
      }

      if (!data.mediumofPayment) {
        return "Select payment method";
      }
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newItem = Object.fromEntries(formData);

    const validationError = validateForm(newItem);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    onAdd(newItem);
  };

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
            Add {itemType === "materials" ? "Material" : "Labour"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-5 flex flex-col gap-3">
            {errorMessage && (
              <div
                className="bg-red-500/20 border border-red-500/40
                text-red-200 text-sm px-4 py-3 rounded-xl"
              >
                {errorMessage}
              </div>
            )}

            {itemType === "materials" ? (
              <>
                <input
                  name="name"
                  placeholder="Material Name"
                  className="inputDarkPremium"
                />

                <input
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  className="inputDarkPremium"
                />

                <input
                  name="unit"
                  placeholder="Unit"
                  className="inputDarkPremium"
                />

                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  className="inputDarkPremium"
                />

                <input
                  name="brand"
                  placeholder="Brand"
                  className="inputDarkPremium"
                />

                <input
                  name="dateOfPurchase"
                  type="date"
                  className="inputDarkPremium"
                />

                <input
                  name="dateOfPayment"
                  type="date"
                  className="inputDarkPremium"
                />

                <select
                  name="mediumofPayment"
                  className="inputDarkPremium"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Payment Method
                  </option>

                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                </select>
              </>
            ) : (
              <>
                <input
                  name="name"
                  placeholder="Labour Name"
                  className="inputDarkPremium"
                />

                <input
                  name="labourType"
                  placeholder="Labour Type"
                  className="inputDarkPremium"
                />

                <input
                  name="salary"
                  type="number"
                  placeholder="Salary"
                  className="inputDarkPremium"
                />

                <input name="date" type="date" className="inputDarkPremium" />

                <select
                  name="mediumofPayment"
                  className="inputDarkPremium"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Payment Method
                  </option>

                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                </select>
              </>
            )}
          </div>

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
              hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-full
              bg-blue-600 text-white
              hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModelForm;
