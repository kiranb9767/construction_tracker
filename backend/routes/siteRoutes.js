import express from "express";
import { userValidation } from "../middleware/authMiddleware.js";
import { createSite, getSites, getSiteById, addMaterials, addLabours, deleteSite, updateMaterials, updateLabours } from "../controllers/siteController.js";

const router = express.Router();

const app = express();

app.use(userValidation);

router.post("/", createSite);
router.get("/", getSites);
router.get("/:siteId", getSiteById);
router.delete("/:siteId", deleteSite);
router.post("/:siteId/materials", addMaterials);
router.post("/:siteId/materials/:id", updateMaterials);
router.post("/:siteId/labour", addLabours);
router.post("/:siteId/labour/:id", updateLabours);

export default router;