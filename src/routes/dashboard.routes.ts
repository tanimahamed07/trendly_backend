import express from "express";
import { dashboardControllers } from "../controller/dashboard.controller";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

// --- Admin Routes ---
router.get("/stats", auth("admin"), dashboardControllers.getDashboardStats);

router.get("/chart-data", auth("admin"), dashboardControllers.getChartData);

// --- User Routes (এগুলো আপনি মিস করেছিলেন) ---
router.get(
  "/user-stats",
  auth("user", "admin"), // ইউজার এবং অ্যাডমিন উভয়ই দেখতে পারবে
  dashboardControllers.getUserDashboardStats,
);

router.get(
  "/user-chart-data",
  auth("user", "admin"),
  dashboardControllers.getUserChartData,
);

export const dashboardRoutes = router;
