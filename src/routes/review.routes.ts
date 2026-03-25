import express from "express";
import { reviewControllers } from "../controller/review.controller";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

// ১. নিজের সব রিভিউ দেখা (এটি উপরে রাখতে হবে)
router.get(
  "/my-reviews",
  auth("user", "admin"), // লগইন করা ইউজার বা এডমিন
  reviewControllers.getMyReviews,
);

// ২. রিভিউ তৈরি করা
router.post("/", auth("user", "admin"), reviewControllers.createReview);

// ৩. প্রোডাক্ট আইডি দিয়ে রিভিউ দেখা
router.get("/item/:itemId", reviewControllers.getReviewsByItem);

// ৪. রিভিউ ডিলিট করা
router.delete("/:id", auth("user", "admin"), reviewControllers.deleteReview);

export const reviewRoutes = router;
