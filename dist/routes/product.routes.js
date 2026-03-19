"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controller/product.controller");
const router = express_1.default.Router();
// Get all products
router.get('/', product_controller_1.productControllers.getProducts);
// Get single product
router.get('/:id', product_controller_1.productControllers.getProductById);
// Create product
router.post('/', product_controller_1.productControllers.createProduct);
// Update product
router.patch('/:id', product_controller_1.productControllers.updateProduct);
// Delete product
router.delete('/:id', product_controller_1.productControllers.deleteProduct);
exports.ProductRoutes = router;
