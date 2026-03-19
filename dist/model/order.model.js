"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
// src/model/booking.model.ts
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    itemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    // Order status
    status: {
        type: String,
        enum: ["pending", "confirmed", "delivered", "cancelled"],
        default: "pending",
    },
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid",
    },
    // Shipping
    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
    },
    trackingNumber: {
        type: String,
    },
    deliveredAt: { type: Date },
    cancelledAt: { type: Date },
    paidAt: { type: Date },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)("Order", bookingSchema);
