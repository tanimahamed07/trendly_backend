import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../model/user.model";
import { Product } from "../model/product.model";
import { Order } from "../model/order.model";

// --- ADMIN CONTROLLERS ---

const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalItems = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$price" } } },
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    res.status(200).json({
      success: true,
      message: "Admin statistics fetched successfully",
      data: { totalUsers, totalItems, totalOrders, totalRevenue },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
      error: err.message,
    });
  }
};

const getChartData = async (req: Request, res: Response) => {
  try {
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const revenueByDay = await Order.aggregate([
      { $match: { paymentStatus: "paid", createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$price" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      message: "Admin chart data fetched successfully",
      data: {
        barChart: {
          labels: ordersByStatus.map((item) => item._id),
          datasets: [
            {
              label: "Orders by Status",
              data: ordersByStatus.map((item) => item.count),
            },
          ],
        },
        lineChart: {
          labels: revenueByDay.map((item) => item._id),
          datasets: [
            {
              label: "Daily Revenue (Last 7 Days)",
              data: revenueByDay.map((item) => item.revenue),
            },
          ],
        },
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// --- USER CONTROLLERS ---

const getUserDashboardStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const totalOrders = await Order.countDocuments({ userId: userObjectId });
    const pendingOrders = await Order.countDocuments({
      userId: userObjectId,
      status: "pending",
    });
    const confirmedOrders = await Order.countDocuments({
      userId: userObjectId,
      status: "confirmed",
    });
    const deliveredOrders = await Order.countDocuments({
      userId: userObjectId,
      status: "delivered",
    });
    const cancelledOrders = await Order.countDocuments({
      userId: userObjectId,
      status: "cancelled",
    });

    const spentResult = await Order.aggregate([
      {
        $match: {
          userId: userObjectId,
          paymentStatus: "paid",
        },
      },
      { $group: { _id: null, totalSpent: { $sum: "$price" } } },
    ]);

    res.status(200).json({
      success: true,
      message: "User dashboard statistics fetched successfully",
      data: {
        totalOrders,
        pendingOrders,
        confirmedOrders,
        deliveredOrders,
        cancelledOrders,
        totalSpent: spentResult[0]?.totalSpent || 0,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getUserChartData = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const ordersByStatus = await Order.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const spendingByDay = await Order.aggregate([
      {
        $match: {
          userId: userObjectId,
          paymentStatus: "paid",
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          spending: { $sum: "$price" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      message: "User chart data fetched successfully",
      data: {
        pieChart: {
          labels: ordersByStatus.map((item) => item._id),
          datasets: [
            {
              label: "My Orders by Status",
              data: ordersByStatus.map((item) => item.count),
            },
          ],
        },
        lineChart: {
          labels: spendingByDay.map((item) => item._id),
          datasets: [
            {
              label: "Daily Spending (Last 30 Days)",
              data: spendingByDay.map((item) => item.spending),
            },
          ],
        },
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const dashboardControllers = {
  getDashboardStats,
  getChartData,
  getUserDashboardStats,
  getUserChartData,
};
