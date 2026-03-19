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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingControllers = void 0;
const order_model_1 = require("../model/order.model");
// Create booking
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { userId } = _a, bookingData = __rest(_a, ["userId"]); // userId client থেকে নেওয়া যাবে না
        const newBooking = yield order_model_1.Order.create(Object.assign(Object.assign({}, bookingData), { userId: req.user._id }));
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: newBooking,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: err.message,
        });
    }
});
// Get all bookings
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, paymentStatus, page = "1", limit = "10" } = req.query;
        const filter = {};
        // Admin/Manager সব দেখবে, User শুধু নিজেরটা
        if (req.user.role === "user") {
            filter.userId = req.user._id;
        }
        if (status) {
            filter.status = status;
        }
        if (paymentStatus) {
            filter.paymentStatus = paymentStatus;
        }
        // Pagination
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;
        const total = yield order_model_1.Order.countDocuments(filter);
        const bookings = yield order_model_1.Order.find(filter)
            .populate("userId", "name email avatar")
            .populate("itemId", "title image price")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);
        res.status(200).json({
            success: true,
            message: "Bookings fetched successfully",
            data: bookings,
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
            message: "Failed to fetch bookings",
            error: err.message,
        });
    }
});
// Update booking
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Sensitive fields বাদ দাও
        const _a = req.body, { userId, itemId, price, trackingNumber, status, paymentStatus } = _a, restUpdateData = __rest(_a, ["userId", "itemId", "price", "trackingNumber", "status", "paymentStatus"]);
        // Status অনুযায়ী timestamp set করো
        const updateData = Object.assign({}, restUpdateData);
        if (status) {
            updateData.status = status;
            if (status === "delivered") {
                updateData.deliveredAt = new Date();
            }
            else if (status === "cancelled") {
                updateData.cancelledAt = new Date();
            }
        }
        if (paymentStatus) {
            updateData.paymentStatus = paymentStatus;
            if (paymentStatus === "paid") {
                updateData.paidAt = new Date();
            }
        }
        if (trackingNumber !== undefined) {
            updateData.trackingNumber = trackingNumber;
        }
        const updatedBooking = yield order_model_1.Order.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!updatedBooking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: updatedBooking,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update booking",
            error: err.message,
        });
    }
});
// Delete booking
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBooking = yield order_model_1.Order.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Booking deleted successfully",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete booking",
            error: err.message,
        });
    }
});
exports.bookingControllers = {
    createBooking,
    getBookings,
    updateBooking,
    deleteBooking,
};
