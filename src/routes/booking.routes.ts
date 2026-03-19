// src/routes/booking.route.ts
import express from "express";

import { bookingControllers } from "../controller/booking.controller";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

// POST /api/bookings
router.post(
  "/",
  auth("user", "admin"),
  bookingControllers.createBooking,
);

// GET /api/bookings
router.get(
  "/",
  auth("user", "admin"),
  bookingControllers.getBookings,
);

// PATCH /api/bookings/:id
router.patch(
  "/:id",
  auth("admin"),
  bookingControllers.updateBooking,
);

// DELETE /api/bookings/:id
router.delete("/:id", auth("admin"), bookingControllers.deleteBooking);

export const bookingRoutes = router;
