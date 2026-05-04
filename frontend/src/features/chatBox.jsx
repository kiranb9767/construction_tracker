import { useState, useEffect } from "react";

import {
  connectSocket,
  disconnectSocket,
  sendMessage,
} from "../services/chatService";

const Chat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    connectSocket((data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => disconnectSocket();
  }, []);

  const handleMsgSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);

    sendMessage(input);
    setInput("");
  };

  return (
    <div className=" fixed bottom-[100px] right-6 z-50">
      <div className="w-[600px] h-[400px] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
        <div className="bg-[#202c33] text-white px-8 py-4 flex justify-between items-center border-b border-gray-700">
          {" "}
          <span className="text-lg font-semibold items-center">Chat</span>
          <button className=" hover:text-gray-400 transition" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto bg-[#0b141a]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-[#005c4b] text-white"
                    : "bg-[#202c33] text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 p-4  bg-[#202c33] border-t border-gray-700">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-[#2a3942] rounded-lg px-3 py-2 text-sm text-white
            hover:ring-2 
              hover:ring-gray-600 
              hover:ring-offset-1
              transition"
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className="bg-[#007a66] text-white px-3 py-2 hover:bg-[#019875] rounded-full
            hover:ring-2 
              hover:ring-green-600 
              hover:ring-offset-1 transition"
            onClick={handleMsgSend}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
