import express from "express";
import { productControllers } from "../controller/product.controller";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();
// Get all products
router.get("/", productControllers.getProducts);
// Get single product
router.get("/:id", productControllers.getProductById);
// Create product
router.post("/", auth("admin"), productControllers.createProduct);
// Update product
router.patch("/:id", productControllers.updateProduct);
// Delete product
router.delete("/:id", productControllers.deleteProduct);

export const ProductRoutes = router;
