import { Schema, model } from "mongoose";
import { TReview } from "../types/review.interface";

const reviewSchema = new Schema<TReview>(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
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
  },
  { timestamps: true },
);

export const Review = model<TReview>("Review", reviewSchema);
