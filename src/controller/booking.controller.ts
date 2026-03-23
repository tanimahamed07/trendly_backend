// src/controllers/booking.controller.ts
import { Request, Response } from "express";
import { Order } from "../model/order.model";


// Create booking
const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, ...bookingData } = req.body; // userId client থেকে নেওয়া যাবে না

    const newBooking = await Order.create({
      ...bookingData,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: err.message,
    });
  }
};

// Get all bookings
const getBookings = async (req: Request, res: Response) => {
  try {
    const { status, paymentStatus, page = "1", limit = "10" } = req.query;

    const filter: Record<string, any> = {};

    // Admin সব দেখবে, User শুধু নিজেরটা
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

    const total = await Order.countDocuments(filter);
    const bookings = await Order.find(filter)
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: err.message,
    });
  }
};

// Update booking
const updateBooking = async (req: Request, res: Response) => {
  try {
    // Sensitive fields বাদ দাও
    const { userId, itemId, price, trackingNumber, status, paymentStatus, ...restUpdateData } = req.body;

    // Status অনুযায়ী timestamp set করো
    const updateData: any = { ...restUpdateData };

    if (status) {
      updateData.status = status;
      if (status === "delivered") {
        updateData.deliveredAt = new Date();
      } else if (status === "cancelled") {
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

    const updatedBooking = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update booking",
      error: err.message,
    });
  }
};

// Delete booking
const deleteBooking = async (req: Request, res: Response) => {
  try {
    const deletedBooking = await Order.findByIdAndDelete(req.params.id);

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
      error: err.message,
    });
  }
};

export const bookingControllers = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
};