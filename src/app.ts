import cors from "cors";
import express, { Application, Request, Response } from "express";
import { UserRoutes } from "./routes/user.routes";
import { ProductRoutes } from "./routes/product.routes";
import { bookingRoutes } from "./routes/booking.routes";
import { reviewRoutes } from "./routes/review.routes";
import { aiRoutes } from "./routes/ai.routes";
import { dashboardRoutes } from "./routes/dashboard.routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

// Auth routes
app.use("/api/auth", UserRoutes);

// User routes
app.use("/api/users", UserRoutes);

// Product/Items routes
app.use("/api/items", ProductRoutes);

// Booking/Order routes
app.use("/api/bookings", bookingRoutes);

// Review routes
app.use("/api/reviews", reviewRoutes);

// AI routes
app.use("/api/ai", aiRoutes);

// Dashboard routes
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Trendly Server is running!");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
