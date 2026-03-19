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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardControllers = void 0;
const user_model_1 = require("../model/user.model");
const product_model_1 = require("../model/product.model");
const order_model_1 = require("../model/order.model");
// Get dashboard statistics
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const totalUsers = yield user_model_1.User.countDocuments();
        const totalItems = yield product_model_1.Product.countDocuments({ isActive: true });
        const totalOrders = yield order_model_1.Order.countDocuments();
        // Calculate total revenue from paid orders
        const revenueResult = yield order_model_1.Order.aggregate([
            { $match: { paymentStatus: "paid" } },
            { $group: { _id: null, totalRevenue: { $sum: "$price" } } },
        ]);
        const totalRevenue = ((_a = revenueResult[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0;
        res.status(200).json({
            success: true,
            message: "Dashboard statistics fetched successfully",
            data: {
                totalUsers,
                totalItems,
                totalOrders,
                totalRevenue,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics",
            error: err.message,
        });
    }
});
// Get chart data for visualization
const getChartData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Bar chart: Orders by status
        const ordersByStatus = yield order_model_1.Order.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const barChartData = {
            labels: ordersByStatus.map((item) => item._id),
            datasets: [
                {
                    label: "Orders by Status",
                    data: ordersByStatus.map((item) => item.count),
                },
            ],
        };
        // Line chart: Revenue over time (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const revenueByDay = yield order_model_1.Order.aggregate([
            {
                $match: {
                    paymentStatus: "paid",
                    createdAt: { $gte: sevenDaysAgo },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    revenue: { $sum: "$price" },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const lineChartData = {
            labels: revenueByDay.map((item) => item._id),
            datasets: [
                {
                    label: "Daily Revenue (Last 7 Days)",
                    data: revenueByDay.map((item) => item.revenue),
                },
            ],
        };
        // Pie chart: Product categories distribution
        const productsByCategory = yield product_model_1.Product.aggregate([
            { $match: { isActive: true } },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
        ]);
        const pieChartData = {
            labels: productsByCategory.map((item) => item._id),
            datasets: [
                {
                    label: "Products by Category",
                    data: productsByCategory.map((item) => item.count),
                },
            ],
        };
        res.status(200).json({
            success: true,
            message: "Chart data fetched successfully",
            data: {
                barChart: barChartData,
                lineChart: lineChartData,
                pieChart: pieChartData,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch chart data",
            error: err.message,
        });
    }
});
exports.dashboardControllers = {
    getDashboardStats,
    getChartData,
};
