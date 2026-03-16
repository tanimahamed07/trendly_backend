import { ObjectId } from "mongoose";

export interface TProduct {
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
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
  tags: string[];
  createdBy: ObjectId;
}
