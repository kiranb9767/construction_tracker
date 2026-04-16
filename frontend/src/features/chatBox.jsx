const Chat = ({ onClose }) => {
  return (
    <div className="fixed bottom-24 right-6 z-50">
      <div className="w-[500px] h-96 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">
        <div className="bg-green-500 text-white px-4 py-2 flex justify-between items-center">
          <span className="text-sm font-semibold">Chat</span>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 text-sm"></div>

        <div className="flex items-center gap-2 p-2 border-t">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-2 py-1 focus:outline-none"
          />

          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
