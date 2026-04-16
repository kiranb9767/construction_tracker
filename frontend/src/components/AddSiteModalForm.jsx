import React, { useState } from "react";

const AddSiteModalForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    budget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSite = {
      id: Date.now(),
      name: formData.name,
      location: formData.location,
      budget: Number(formData.budget),
      spent: 0,
    };

    onAdd(newSite);
    onClose();
  };

  return (
    <div className="fixed bottom-20 right-6 z-50">
      
      <div className="w-[500px] h-96 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        
        <div className="bg-blue-600 text-white flex justify-between items-center mb-4 px-4 py-2 rounded-tl-lg rounded-tr-lg">
          <span className="text-lg font-semibold">Add Construction</span>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>
        <hr className="border-gray-700" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Site Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={formData.budget}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-5 mt-10 ">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-200 border border-gray-300    hover:ring-2 
              hover:ring-gray-500 
              hover:ring-offset-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl  
              hover:ring-2 
              hover:ring-blue-500 
              hover:ring-offset-2"
            >
              Add
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddSiteModalForm;