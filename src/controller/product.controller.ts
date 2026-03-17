import { Request, Response } from "express";
import { Product } from "../model/product.model";

const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "product created successfully",
      data: newProduct,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: err.message,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      priceMin,
      priceMax,
      rating,
      sort,
      page = "1",
      limit = "10",
    } = req.query;

    // ✅ Filter object build করো
    const filter: Record<string, any> = { isActive: true };

    // Search — title, description, category তে
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Price range filter
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }

    // Rating filter
    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    // ✅ Sort build করো
    let sortOption: Record<string, 1 | -1> = { createdAt: -1 }; // default
    if (sort) {
      const sortField = (sort as string).startsWith("-")
        ? (sort as string).slice(1)
        : (sort as string);
      const sortOrder = (sort as string).startsWith("-") ? -1 : 1;
      sortOption = { [sortField]: sortOrder };
    }

    // ✅ Pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: err.message,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: err.message,
    });
  }
};

// Update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: err.message,
    });
  }
};

// Delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: err.message,
    });
  }
};

export const productControllers = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
