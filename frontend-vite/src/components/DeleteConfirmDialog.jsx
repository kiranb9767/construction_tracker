const DeleteConfirmDialog = ({ itemType, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="w-full max-w-md rounded-2xl overflow-hidden
        bg-gradient-to-b from-[#2a2a2a] to-[#3a3a3a]
        border border-gray-700
        shadow-[12px_24px_60px_rgba(0,0,0,0.6)]">

        {/* 🔹 HEADER */}
        <div className="px-5 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-gray-100 tracking-wide">
            Delete {itemType === "materials" ? "Material" : "Labour"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* 🔹 CONTENT */}
        <div className="px-5 py-4 text-sm text-gray-300">
          Are you sure you want to delete this{" "}
          <span className="text-gray-100 font-medium">
            {itemType === "materials" ? "material" : "labour"}
          </span>
          ?
        </div>

        <div className="px-5 py-4 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full
            bg-[#202c33] text-gray-300
            border border-gray-600
            hover:transition
            hover:ring-2 hover:ring-gray-600 hover:ring-offset-2 hover:ring-offset-[#2a2a2a]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-2 
            bg-red-600 text-white
   
            transition
            hover:ring-2 hover:ring-red-600 hover:ring-offset-2 hover:ring-offset-[#2a2a2a]
            rounded-full"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;