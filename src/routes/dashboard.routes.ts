import express from "express";
import { dashboardControllers } from "../controller/dashboard.controller";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

// Get dashboard statistics (admin only)
router.get(
  "/stats",
  auth("admin"),
  dashboardControllers.getDashboardStats,
);

// Get chart data (admin only)
router.get(
  "/chart-data",
  auth("admin"),
  dashboardControllers.getChartData,
);

export const dashboardRoutes = router;
