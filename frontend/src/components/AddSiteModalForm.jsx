import React, { useState } from "react";

const AddSiteModalForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    location: "",
    budget: "",
    startDate: "",
    remainingBudget: "",
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
      name: formData.name,
      location: formData.location,
      budget: Number(formData.budget),
      owner: formData.owner,
      startDate: new Date(formData.startDate.split("T")[0]),
      remainingBudget: Number(formData.budget),
    };

    onAdd(newSite);
    onClose();
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
            Add Site
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <input
            type="text"
            name="name"
            placeholder="Site Name"
            value={formData.name}
            onChange={handleChange}
            className="inputDarkPremium"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="inputDarkPremium"
            required
          />
          <input
            type="date"
            name="startDate"
            placeholder="Start Date"
            value={formData.startDate?.split("T")[0]}
            onChange={handleChange}
            className="inputDarkPremium"
            required
          />
          <input
            type="text"
            name="owner"
            placeholder="Owner"
            value={formData.owner}
            onChange={handleChange}
            className="inputDarkPremium"
            required
          />
          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={formData.budget}
            onChange={handleChange}
            className="inputDarkPremium"
            required
          />

          <div className="flex justify-end gap-5  p-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-200 border border-gray-300   hover:ring-2 
              hover:ring-gray-500 
              hover:ring-offset-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={onAdd}
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
