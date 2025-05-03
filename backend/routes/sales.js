import express from "express";

import { getTopCentersByYear } from "../controllers/SalesController.js"; // Adjust path as needed
import { getTopClientsByTotalMontTTC } from "../controllers/SalesController.js"; // Adjust path to your controller
const router = express.Router();
router.get("/top-clients", getTopClientsByTotalMontTTC);
router.get("/top-centers", getTopCentersByYear);
export default router;