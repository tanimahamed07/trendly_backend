// src/model/booking.model.ts
import { Schema, model } from "mongoose";
import { TOrder } from "../types/order.interface";

const bookingSchema = new Schema<TOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true },
);

export const Order = model<TOrder>("Order", bookingSchema);
