const AddItemModelForm = ({ itemType, onClose, onAdd }) => {
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newItem = Object.fromEntries(formData);
            onAdd(newItem);
          }}
          className="flex flex-col"
        >
          <div className="p-5 flex flex-col gap-3">
            {itemType === "materials" ? (
              <>
                <input
                  name="name"
                  placeholder="Material Name"
                  className="inputDarkPremium"
                  required
                />
                <input
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  className="inputDarkPremium"
                  required
                />
                <input
                  name="unit"
                  placeholder="Unit"
                  className="inputDarkPremium"
                  required
                />
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  className="inputDarkPremium"
                  required
                />
                <input
                  name="brand"
                  placeholder="Brand"
                  className="inputDarkPremium"
                  required
                />
                <input
                  name="dateOfPurchase"
                  placeholder="Date of Purchase"
                  className="inputDarkPremium"
                  required
                />
                <input
                  name="dateOfPayment"
                  placeholder="Date of Payment"
                  className="inputDarkPremium"
                  required
                />

                <select
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
                  name="name"
                  placeholder="Labour Name"
                  className="inputDarkPremium"
                  required
                />
                <input
                  name="labourType"
                  placeholder="Labour Type"
                  className="inputDarkPremium"
                  required
                />
                <input
                  name="salary"
                  type="number"
                  placeholder="Salary"
                  className="inputDarkPremium"
                  required
                />
                <input
                  name="date"
                  placeholder="Date"
                  className="inputDarkPremium"
                  required
                />

                <select
                  name="mediumofPayment"
                  className="inputDarkPremium"
                  required
                >
                  <option value="" disabled selected hidden>
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModelForm;
