import { Document, Types } from "mongoose";

export interface TReview extends Document {
  rating: number;
  comment: string;
  userId: Types.ObjectId;
  itemId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
