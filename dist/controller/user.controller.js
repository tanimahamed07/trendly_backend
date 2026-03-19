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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../model/user.model");
const config_1 = __importDefault(require("../config"));
// Register user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Check if user already exists
        const isUserExist = yield user_model_1.User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists!",
            });
        }
        const savedUser = yield user_model_1.User.create(req.body);
        // Generate token
        const token = jsonwebtoken_1.default.sign({ _id: savedUser._id, email: savedUser.email, role: savedUser.role }, config_1.default.jwt_secret, { expiresIn: config_1.default.jwt_expires_in });
        // Omit password from response
        const userResponse = savedUser.toObject();
        delete userResponse.password;
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userResponse,
            token,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to register user",
            error: err.message,
        });
    }
});
// Login user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = yield user_model_1.User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        // Compare passwords
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ email: user.email, role: user.role }, config_1.default.jwt_secret, { expiresIn: config_1.default.jwt_expires_in });
        // Omit password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            data: userResponse,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to login",
            error: err.message,
        });
    }
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is required",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        const newToken = jsonwebtoken_1.default.sign({ email: decoded.email, role: decoded.role }, config_1.default.jwt_secret, { expiresIn: config_1.default.jwt_expires_in });
        res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            token: newToken,
        });
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error: err.message,
        });
    }
});
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find().select("-password");
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: err.message,
        });
    }
});
// Get user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: err.message,
        });
    }
});
// Update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // password direct update করতে দেওয়া যাবে না
        const _a = req.body, { password, role } = _a, updateData = __rest(_a, ["password", "role"]);
        const updatedUser = yield user_model_1.User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: err.message,
        });
    }
});
// Delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_model_1.User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: err.message,
        });
    }
});
// Update user role (admin only)
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, role } = req.body;
        if (!["user", "manager", "admin"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role",
            });
        }
        const updatedUser = yield user_model_1.User.findByIdAndUpdate(userId, { role }, { new: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: updatedUser,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update user role",
            error: err.message,
        });
    }
});
exports.userControllers = {
    register,
    login,
    refreshToken,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateUserRole,
};
// ## Query examples যেগুলো এখন কাজ করবে
// ```
// GET /api/items?search=phone
// GET /api/items?category=electronics
// GET /api/items?priceMin=10&priceMax=100
// GET /api/items?rating=4
// GET /api/items?sort=price        → price low to high
// GET /api/items?sort=-rating      → rating high to low
// GET /api/items?sort=-createdAt   → newest first
// GET /api/items?page=2&limit=10
// ```
// এগুলো সব একসাথেও কাজ করবে:
// ```
// GET /api/items?search=phone&category=electronics&priceMin=50&sort=-rating&page=1&limit=10
