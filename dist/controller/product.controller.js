"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const product_model_1 = require("../model/product.model");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield product_model_1.Product.create(req.body);
        res.status(201).json({
            success: true,
            message: "product created successfully",
            data: newProduct,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: err.message,
        });
    }
});
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, category, priceMin, priceMax, rating, sort, page = "1", limit = "10", } = req.query;
        // ✅ Filter object build করো
        const filter = { isActive: true };
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
            if (priceMin)
                filter.price.$gte = Number(priceMin);
            if (priceMax)
                filter.price.$lte = Number(priceMax);
        }
        // Rating filter
        if (rating) {
            filter.rating = { $gte: Number(rating) };
        }
        // ✅ Sort build করো
        let sortOption = { createdAt: -1 }; // default
        if (sort) {
            const sortField = sort.startsWith("-")
                ? sort.slice(1)
                : sort;
            const sortOrder = sort.startsWith("-") ? -1 : 1;
            sortOption = { [sortField]: sortOrder };
        }
        // ✅ Pagination
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;
        const total = yield product_model_1.Product.countDocuments(filter);
        const products = yield product_model_1.Product.find(filter)
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: err.message,
        });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.Product.findById(req.params.id);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error: err.message,
        });
    }
});
// Update product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { rating, ratingCount, createdBy } = _a, updateData = __rest(_a, ["rating", "ratingCount", "createdBy"]);
    try {
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: err.message,
        });
    }
});
// Delete product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield product_model_1.Product.findByIdAndDelete(req.params.id);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: err.message,
        });
    }
});
exports.productControllers = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
