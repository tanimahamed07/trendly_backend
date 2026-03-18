import express from "express";
import { reviewControllers } from "../controller/review.controller";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

// Create review (authenticated users only)
router.post(
  "/",
  auth("user", "admin", "manager"),
  reviewControllers.createReview,
);

// Get reviews by item ID (public)
router.get("/item/:itemId", reviewControllers.getReviewsByItem);

// Delete review (admin or review owner)
router.delete("/:id", auth("admin"), reviewControllers.deleteReview);

export const reviewRoutes = router;
