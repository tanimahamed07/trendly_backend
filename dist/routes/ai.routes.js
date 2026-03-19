"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ai_controller_1 = require("../controller/ai.controller");
const router = express_1.default.Router();
// AI Chat endpoint for customer shopping help
router.post("/chat", ai_controller_1.aiControllers.aiChat);
// Generate product description from title
router.post("/generate-description", ai_controller_1.aiControllers.generateDescription);
// Summarize reviews
router.post("/review-summary", ai_controller_1.aiControllers.reviewSummary);
exports.aiRoutes = router;
