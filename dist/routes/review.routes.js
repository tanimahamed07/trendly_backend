"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../controller/review.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Create review (authenticated users only)
router.post("/", (0, auth_middleware_1.auth)("user", "admin", "manager"), review_controller_1.reviewControllers.createReview);
// Get reviews by item ID (public)
router.get("/item/:itemId", review_controller_1.reviewControllers.getReviewsByItem);
// Delete review (admin or review owner)
router.delete("/:id", (0, auth_middleware_1.auth)("admin"), review_controller_1.reviewControllers.deleteReview);
exports.reviewRoutes = router;
