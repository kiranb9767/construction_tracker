import { useState } from "react";

const  EditItemModelForm = ({ itemType, onClose, onUpdate, initialData }) => {

    const [formData, setFormData] = useState({ ...initialData });
    console.log("Initial data for edit form:", initialData);
    console.log("Form data state in edit form:", formData);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Edit {itemType === "materials" ? "Material" : "Labour"}</h2>
            <button onClick={onClose} className="text-gray-500">✕</button>
            
          </div>   
          
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const updateItem = Object.fromEntries(formData);
              onUpdate(updateItem);
            }} className="flex flex-col gap-4">
                {itemType === "materials" ? (
                    <>
                        <input type="text" value={formData.name} onChange={(e)=> setFormData({...formData,name:e.target.value})} name="name" placeholder="Material Name" className="border p-2 rounded" required />
                        <input type="number" value={formData.quantity} onChange={(e)=> setFormData({...formData,quantity:Number(e.target.value)})} name="quantity" placeholder="Quantity" className="border p-2 rounded" required />
                        <input type="text" value={formData.unit} onChange={(e)=> setFormData({...formData,unit:Number(e.target.value)})} name="unit" placeholder="Unit" className="border p-2 rounded" required />
                        <input type="number" value={formData.price} onChange={(e)=> setFormData({...formData,price:Number(e.target.value)})} name="price" placeholder="Price" className="border p-2 rounded" required />
                        <input type="text" value={formData.brand} onChange={(e)=> setFormData({...formData,brand:e.target.value})} name="brand" placeholder="Brand" className="border p-2 rounded" required />
                        <input type="text" value={formData.dateOfPurchase?.split("T")[0] || ""} onChange={(e)=> setFormData({...formData,dateOfPurchase:e.target.value})} name="dateOfPurchase" placeholder="Date of Purchase" className="border p-2 rounded" required />
                        <input type="text" value={formData.dateOfPayment?.split("T")[0] || ""} onChange={(e)=> setFormData({...formData,dateOfPayment:e.target.value})} name="dateofPayment" placeholder="Date of Payment" className="border p-2 rounded" required />
                        <select value={formData.mediumofPayment} onChange={(e)=> setFormData({...formData,mediumofPayment:e.target.value})} name="mediumofPayment" className="border p-2 rounded" required>
                            <option value="">Select Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </>
                ) : (
                    <>
                        <input type="text" value={formData.name} onChange={(e)=> setFormData({...formData,name:e.target.value})} name="name" placeholder="Labour Name" className="border p-2 rounded" required />
                        <input type="text" value={formData.labourType} onChange={(e)=> setFormData({...formData,labourType:e.target.value})} name="labourType" placeholder="Labour Type" className="border p-2 rounded" required />
                        <input type="number" value={formData.salary} onChange={(e)=> setFormData({...formData,salary:Number(e.target.value)})} name="salary" placeholder="Salary" className="border p-2 rounded" required />
                        <input type="text" value={formData.date?.split("T")[0] || ""} onChange={(e)=> setFormData({...formData,date:e.target.value})} name="date" placeholder="Date" className="border p-2 rounded" required />
                        <select value={formData.mediumofPayment} onChange={(e)=> setFormData({...formData,mediumofPayment:e.target.value})} name="mediumofPayment" className="border p-2 rounded" required>
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

export default EditItemModelForm;