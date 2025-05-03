import express from "express";
import { getClientsByGovernorate, getClientsWithLivraisonFacts } from "../controllers/clientController.js";

const router = express.Router();

// Route to fetch clients by governorate
router.get("/clients-by-governorate", getClientsByGovernorate);

// Route to fetch clients with livraison facts
router.get("/clients-with-livraison-facts", getClientsWithLivraisonFacts);

export default router;