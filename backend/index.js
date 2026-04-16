import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./dbconfig/db.js";
import authRoutes from "./routes/authRoutes.js";
import siteRoutes from "./routes/siteRoutes.js";

dotenv.config();
await connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Construction backend running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/sites", siteRoutes);


app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
