import express from "express";
import { getTopGovernoratesByTemp } from "../controllers/governorateController.js"; // Adjust path as per your project structure

const router = express.Router();

// Route to get top 5 governorates by average temperature
router.get("/top-governorates", getTopGovernoratesByTemp);

export default router;