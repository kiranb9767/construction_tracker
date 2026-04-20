import { useState,useEffect } from "react";

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
    <div className="fixed bottom-12 right-6 z-50">
      <div className="w-[600px] h-96 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">
        <div className="bg-green-500 text-white px-6 py-4 flex justify-between items-center">
          <span className="text-sm font-semibold">Chat</span>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
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
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 p-2 border-t">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-2 py-1 focus:outline-none"
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            onClick={handleMsgSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
