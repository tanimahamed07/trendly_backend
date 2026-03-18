import express from "express";
import { aiControllers } from "../controller/ai.controller";

const router = express.Router();

// AI Chat endpoint for customer shopping help
router.post("/chat", aiControllers.aiChat);

// Generate product description from title
router.post("/generate-description", aiControllers.generateDescription);

// Summarize reviews
router.post("/review-summary", aiControllers.reviewSummary);

export const aiRoutes = router;
