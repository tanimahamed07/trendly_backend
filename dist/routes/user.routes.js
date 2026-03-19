"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
// User CRUD routes (no auth routes here — those are in auth.routes.ts)
router.get('/', user_controller_1.userControllers.getUsers);
router.patch('/role', user_controller_1.userControllers.updateUserRole); // Must be ABOVE /:id to prevent conflict
router.get('/:id', user_controller_1.userControllers.getUserById);
router.patch('/:id', user_controller_1.userControllers.updateUser);
router.delete('/:id', user_controller_1.userControllers.deleteUser);
exports.UserRoutes = router;
