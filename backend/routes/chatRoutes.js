import express from "express";
import {startConversation} from "../controllers/aiAsistantController.js";

const router = express.Router();

router.get("/chat/ai",startConversation);
