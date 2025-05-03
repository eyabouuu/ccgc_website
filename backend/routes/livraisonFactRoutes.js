import express from "express";
import { getLivraisonFactsByCodeTiers } from "../controllers/livraisonFactController.js";

const router = express.Router();

// Route to fetch livraison_fact by Code_tiers
router.get("/:code_tiers", getLivraisonFactsByCodeTiers);

export default router;