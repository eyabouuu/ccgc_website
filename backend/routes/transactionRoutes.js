import express from "express";
import { getTransactionTypesDistribution } from "../controllers/transactionController.js";

const router = express.Router();

// Route to get transaction types distribution
router.get("/transaction-types-distribution", getTransactionTypesDistribution);

export default router;