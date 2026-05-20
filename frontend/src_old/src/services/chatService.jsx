

let socket = null;

export const connectSocket = (onMessage) => {
  socket = new WebSocket("ws://localhost:5000");

  socket.onopen = () => {
    console.log("WS Connected");
  };

  socket.onmessage = (event) => {
    console.log("Raw message from server:", event.data);
    const data = JSON.parse(event.data);
    console.log("Received from server:", data);
    onMessage(data); 
  };

  socket.onclose = () => {
    console.log("WS Disconnected");
  };
};

export const sendMessage = (message) => {

  socket.send(
    JSON.stringify({
      text: message,
      sender: "user",
    })
  );
};

export const disconnectSocket = () => {
  if (socket) socket.close();
};

