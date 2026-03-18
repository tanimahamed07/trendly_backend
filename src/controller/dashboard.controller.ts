import { Request, Response } from "express";
import { User } from "../model/user.model";
import { Product } from "../model/product.model";
import { Order } from "../model/order.model";

// Get dashboard statistics
const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalItems = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue from paid orders
    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$price" } } },
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: err.message,
    });
  }
};

// Get chart data for visualization
const getChartData = async (req: Request, res: Response) => {
  try {
    // Bar chart: Orders by status
    const ordersByStatus = await Order.aggregate([
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

    const revenueByDay = await Order.aggregate([
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
    const productsByCategory = await Product.aggregate([
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch chart data",
      error: err.message,
    });
  }
};

export const dashboardControllers = {
  getDashboardStats,
  getChartData,
};
