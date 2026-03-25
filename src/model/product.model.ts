import { model, Schema } from "mongoose";
import { TProduct } from "../types/product.interface";

const productSchema = new Schema<TProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
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
    isTrending: { type: Boolean, default: false },
    tags: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const Product = model<TProduct>("Product", productSchema);
