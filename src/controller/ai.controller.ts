import { Request, Response } from "express";
import config from "../config";
import { Review } from "../model/review.model";

const API_KEY = config.gemini_api_key;
const GEMINI_MODEL = "gemini-pro";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;

// Helper function to call Gemini API
const callGeminiAPI = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API key not configured");
  }

  try {
    const response = await fetch(GEMINI_API_URL, {
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
      const error = await response.json();
      throw new Error(
        `Gemini API Error: ${error.error?.message || "Unknown error"}`,
      );
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || "No response from AI";
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    throw err;
  }
};

// AI Chatbot endpoint for customer help
const aiChat = async (req: Request, res: Response) => {
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

    const aiResponse = await callGeminiAPI(contextPrompt);

    res.status(200).json({
      success: true,
      message: "Chat response generated successfully",
      data: {
        userMessage: message,
        aiResponse,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to generate chat response",
      error: err.message,
    });
  }
};

// Generate product description from title
const generateDescription = async (req: Request, res: Response) => {
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

    const description = await callGeminiAPI(prompt);

    res.status(200).json({
      success: true,
      message: "Product description generated successfully",
      data: {
        title,
        description,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to generate description",
      error: err.message,
    });
  }
};

// Summarize reviews using AI
const reviewSummary = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "itemId is required",
      });
    }

    // Fetch reviews from database
    const reviews = await Review.find({ itemId }).limit(10);

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

    const summary = await callGeminiAPI(prompt);

    res.status(200).json({
      success: true,
      message: "Review summary generated successfully",
      data: {
        summary,
        reviewCount: reviews.length,
        averageRating:
          Math.round(
            (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) *
              10,
          ) / 10,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to generate review summary",
      error: err.message,
    });
  }
};

export const aiControllers = {
  aiChat,
  generateDescription,
  reviewSummary,
};
