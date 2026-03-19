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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewControllers = void 0;
const review_model_1 = require("../model/review.model");
const product_model_1 = require("../model/product.model");
// Create review
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId, rating, comment } = req.body;
        // Check if product exists
        const product = yield product_model_1.Product.findById(itemId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        const newReview = yield review_model_1.Review.create({
            itemId,
            rating,
            comment,
            userId: req.user._id,
        });
        // Aggregate ratings to update product rating
        const reviews = yield review_model_1.Review.find({ itemId });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        yield product_model_1.Product.findByIdAndUpdate(itemId, {
            rating: Math.round(avgRating * 10) / 10,
            ratingCount: reviews.length,
        }, { new: true });
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: newReview,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create review",
            error: err.message,
        });
    }
});
// Get reviews by item ID
const getReviewsByItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.params;
        const { page = "1", limit = "10" } = req.query;
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;
        const total = yield review_model_1.Review.countDocuments({ itemId });
        const reviews = yield review_model_1.Review.find({ itemId })
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch reviews",
            error: err.message,
        });
    }
});
// Delete review
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_model_1.Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }
        // Recalculate product ratings
        const reviews = yield review_model_1.Review.find({ itemId: review.itemId });
        if (reviews.length > 0) {
            const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
            yield product_model_1.Product.findByIdAndUpdate(review.itemId, {
                rating: Math.round(avgRating * 10) / 10,
                ratingCount: reviews.length,
            }, { new: true });
        }
        else {
            yield product_model_1.Product.findByIdAndUpdate(review.itemId, { rating: 0, ratingCount: 0 }, { new: true });
        }
        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete review",
            error: err.message,
        });
    }
});
exports.reviewControllers = {
    createReview,
    getReviewsByItem,
    deleteReview,
};
