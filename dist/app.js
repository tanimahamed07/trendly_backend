"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("./routes/auth.routes");
const user_routes_1 = require("./routes/user.routes");
const product_routes_1 = require("./routes/product.routes");
const booking_routes_1 = require("./routes/booking.routes");
const review_routes_1 = require("./routes/review.routes");
const ai_routes_1 = require("./routes/ai.routes");
const dashboard_routes_1 = require("./routes/dashboard.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Auth routes (register, login, refresh-token only)
app.use("/api/auth", auth_routes_1.AuthRoutes);
// User management routes (CRUD only)
app.use("/api/users", user_routes_1.UserRoutes);
// Product/Items routes
app.use("/api/items", product_routes_1.ProductRoutes);
// Booking/Order routes
app.use("/api/bookings", booking_routes_1.bookingRoutes);
// Review routes
app.use("/api/reviews", review_routes_1.reviewRoutes);
// AI routes
app.use("/api/ai", ai_routes_1.aiRoutes);
// Dashboard routes
app.use("/api/dashboard", dashboard_routes_1.dashboardRoutes);
app.get("/", (req, res) => {
    res.send("Trendly Server is running!");
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
