"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...roles) => {
    return (req, res, next) => {
        var _a;
        try {
            // Header থেকে token নাও
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Token not found",
                });
            }
            // Token verify করো
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
            // Role check করো
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized",
                });
            }
            // req.user এ রাখো
            req.user = decoded;
            next();
        }
        catch (err) {
            res.status(401).json({
                success: false,
                message: "Invalid or expired token",
                error: err.message,
            });
        }
    };
};
exports.auth = auth;
