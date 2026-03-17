// src/types/booking.interface.ts

import { Types } from "mongoose";

export interface TOrder {
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
  deliveredAt?: Date;
  cancelledAt?: Date;
  paidAt?: Date;
}
