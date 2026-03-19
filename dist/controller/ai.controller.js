"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiControllers = void 0;
const config_1 = __importDefault(require("../config"));
const review_model_1 = require("../model/review.model");
const API_KEY = config_1.default.gemini_api_key;
const GEMINI_MODEL = "gemini-pro";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;
// Helper function to call Gemini API
const callGeminiAPI = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (!API_KEY) {
        throw new Error("Gemini API key not configured");
    }
    try {
        const response = yield fetch(GEMINI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": API_KEY,
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt,
                            },
                        ],
                    },
                ],
            }),
        });
        if (!response.ok) {
            const error = yield response.json();
            throw new Error(`Gemini API Error: ${((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || "Unknown error"}`);
        }
        const data = yield response.json();
        return ((_d = (_c = (_b = data.candidates[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts[0]) === null || _d === void 0 ? void 0 : _d.text) || "No response from AI";
    }
    catch (err) {
        console.error("Gemini API Error:", err);
        throw err;
    }
});
// AI Chatbot endpoint for customer help
const aiChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            });
        }
        // Add e-commerce context to the prompt
        const contextPrompt = `You are a helpful e-commerce shopping assistant. Help customers with:
- Product recommendations based on budget or category
- Comparing products
- Suggesting gift ideas
- Answering questions about shopping

Customer message: "${message}"

Provide a helpful, concise response focused on e-commerce shopping.`;
        const aiResponse = yield callGeminiAPI(contextPrompt);
        res.status(200).json({
            success: true,
            message: "Chat response generated successfully",
            data: {
                userMessage: message,
                aiResponse,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to generate chat response",
            error: err.message,
        });
    }
});
// Generate product description from title
const generateDescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, category, brand } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Product title is required",
            });
        }
        const prompt = `Generate a compelling and concise e-commerce product description for:
Title: ${title}
${category ? `Category: ${category}` : ""}
${brand ? `Brand: ${brand}` : ""}

Description should be 2-3 sentences, highlighting key benefits and features. Focus on what matters to buyers.`;
        const description = yield callGeminiAPI(prompt);
        res.status(200).json({
            success: true,
            message: "Product description generated successfully",
            data: {
                title,
                description,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to generate description",
            error: err.message,
        });
    }
});
// Summarize reviews using AI
const reviewSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.body;
        if (!itemId) {
            return res.status(400).json({
                success: false,
                message: "itemId is required",
            });
        }
        // Fetch reviews from database
        const reviews = yield review_model_1.Review.find({ itemId }).limit(10);
        if (reviews.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No reviews to summarize",
                data: {
                    summary: "No reviews available for this product yet.",
                    reviewCount: 0,
                },
            });
        }
        // Create review text for summarization
        const reviewsText = reviews
            .map((r) => `Rating: ${r.rating}/5 - ${r.comment}`)
            .join("\n");
        const prompt = `Summarize the following product reviews in 2-3 sentences. Focus on:
1. Key positive points
2. Any concerns or criticisms
3. Overall sentiment

Reviews:
${reviewsText}

Provide a balanced summary that helps potential buyers understand customer opinions.`;
        const summary = yield callGeminiAPI(prompt);
        res.status(200).json({
            success: true,
            message: "Review summary generated successfully",
            data: {
                summary,
                reviewCount: reviews.length,
                averageRating: Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) *
                    10) / 10,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to generate review summary",
            error: err.message,
        });
    }
});
exports.aiControllers = {
    aiChat,
    generateDescription,
    reviewSummary,
};
