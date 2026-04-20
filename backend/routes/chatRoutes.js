import { startConversation } from "../controllers/aiAsistantController.js";

const chatRoutes = (wss) => {
  wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", (message) => {
      console.log("Received message:", JSON.parse(message));
      startConversation(JSON.parse(message))
        .then((response) => {
          ws.send(
            JSON.stringify({
              sender: "bot",
              text: response,
            }),
          );
        })
        .catch((error) => {
          console.error("Error processing message:", error);
          ws.send(
            JSON.stringify({
              sender: "bot",
              text: "Error processing your message. Please try again.",
            }),
          );
        });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

export default chatRoutes;
