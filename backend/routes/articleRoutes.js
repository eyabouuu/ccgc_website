import express from "express";
import { getSalesByArticleType, getArticlePerformance } from "../controllers/articleController.js";

const router = express.Router();

// Route to fetch sales by article type
router.get("/sales-by-article", getSalesByArticleType);

// Route to fetch article performance data
router.get("/article-performance", getArticlePerformance);

export default router;