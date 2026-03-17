// src/types/booking.interface.ts

import { Types } from "mongoose";

export interface TBooking {
  userId: Types.ObjectId;
  itemId: Types.ObjectId;
  quantity: number;
  price: number;
  status: "pending" | "confirmed" | "cancelled" | "delivered";
  paymentStatus: "unpaid" | "paid";
  trackingNumber?: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
  };
}
