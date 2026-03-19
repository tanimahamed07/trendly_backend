"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dashboard_controller_1 = require("../controller/dashboard.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Get dashboard statistics (admin/manager only)
router.get("/stats", (0, auth_middleware_1.auth)("admin", "manager"), dashboard_controller_1.dashboardControllers.getDashboardStats);
// Get chart data (admin/manager only)
router.get("/chart-data", (0, auth_middleware_1.auth)("admin", "manager"), dashboard_controller_1.dashboardControllers.getChartData);
exports.dashboardRoutes = router;
