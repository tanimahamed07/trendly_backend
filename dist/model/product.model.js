"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    currency: { type: String, required: true },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, default: true },
    tags: [{ type: String }],
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)("Product", productSchema);
