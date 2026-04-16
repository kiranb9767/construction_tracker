const  AddItemModelForm = ({ itemType, onClose, onSubmit }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Add {itemType === "materials" ? "Material" : "Labour"}</h2>
            <button onClick={onClose} className="text-gray-500">✕</button>
            
          </div>   
          
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                {itemType === "materials" ? (
                    <>
                        <input type="text" name="name" placeholder="Material Name" className="border p-2 rounded" required />
                        <input type="number" name="quantity" placeholder="Quantity" className="border p-2 rounded" required />
                        <input type="number" name="price" placeholder="Price" className="border p-2 rounded" required />
                        <input type="text" name="brand" placeholder="Brand" className="border p-2 rounded" required />
                        <input type="date" name="dateOfPurchase" placeholder="Date of Purchase" className="border p-2 rounded" required />
                        <input type="date" name="dateofPayment" placeholder="Date of Payment" className="border p-2 rounded" required />
                        <select name="mediumofPayment" className="border p-2 rounded" required>
                            <option value="">Select Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </>
                ) : (
                    <>
                        <input type="text" name="name" placeholder="Labour Name" className="border p-2 rounded" required />
                        <input type="number" name="salary" placeholder="Salary" className="border p-2 rounded" required />
                        <input type="date" name="date" placeholder="Date" className="border p-2 rounded" required />
                        <select name="mediumofPayment" className="border p-2 rounded" required>
                            <option value="">Select Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </>
                )}

                <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
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