import { Request, Response } from "express";
import { Review } from "../model/review.model";
import { Product } from "../model/product.model";

// Create review
const createReview = async (req: Request, res: Response) => {
  try {
    console.log("req.user →", req.user);
    console.log("req.body →", req.body);
    const { itemId, rating, comment } = req.body;

    // Check if product exists
    const product = await Product.findById(itemId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const newReview = await Review.create({
      itemId,
      rating,
      comment,
      userId: req.user._id,
    });

    // Aggregate ratings to update product rating
    const reviews = await Review.find({ itemId });
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(
      itemId,
      {
        rating: Math.round(avgRating * 10) / 10,
        ratingCount: reviews.length,
      },
      { new: true },
    );

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: newReview,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: err.message,
    });
  }
};

// Get reviews by item ID
const getReviewsByItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const { page = "1", limit = "10" } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const total = await Review.countDocuments({ itemId });
    const reviews = await Review.find({ itemId })
      .populate("userId", "name avatar email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: err.message,
    });
  }
};

// Delete review
const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Recalculate product ratings
    const reviews = await Review.find({ itemId: review.itemId });
    if (reviews.length > 0) {
      const avgRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await Product.findByIdAndUpdate(
        review.itemId,
        {
          rating: Math.round(avgRating * 10) / 10,
          ratingCount: reviews.length,
        },
        { new: true },
      );
    } else {
      await Product.findByIdAndUpdate(
        review.itemId,
        { rating: 0, ratingCount: 0 },
        { new: true },
      );
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: err.message,
    });
  }
};

export const reviewControllers = {
  createReview,
  getReviewsByItem,
  deleteReview,
};
