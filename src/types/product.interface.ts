import { Types } from "mongoose";

export interface TProduct {
  title: string;
  description: string;
  image: string;

  price: number;
  compareAtPrice: number;
  currency: string;
  rating: number;
  ratingCount: number;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  isActive: boolean;
  isTrending: boolean;
  tags: string[];
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
