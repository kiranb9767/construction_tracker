import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./dbconfig/db.js";
import authRoutes from "./routes/authRoutes.js";
import siteRoutes from "./routes/siteRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { WebSocketServer } from "ws";
import http from "http";

dotenv.config();
await connectDB();

const app = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

chatRoutes(wss);

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true,
  }
));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Construction backend running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/sites", siteRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port 5000`);
});
