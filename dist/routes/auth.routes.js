"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
// Auth-only routes
router.post('/register', user_controller_1.userControllers.register);
router.post('/login', user_controller_1.userControllers.login);
router.post('/refresh-token', user_controller_1.userControllers.refreshToken);
exports.AuthRoutes = router;
