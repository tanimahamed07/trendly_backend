"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
// src/routes/booking.route.ts
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("../controller/booking.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// POST /api/bookings
router.post("/", (0, auth_middleware_1.auth)("user", "admin", "manager"), booking_controller_1.bookingControllers.createBooking);
// GET /api/bookings
router.get("/", (0, auth_middleware_1.auth)("user", "admin", "manager"), booking_controller_1.bookingControllers.getBookings);
// PATCH /api/bookings/:id
router.patch("/:id", (0, auth_middleware_1.auth)("admin", "manager"), booking_controller_1.bookingControllers.updateBooking);
// DELETE /api/bookings/:id
router.delete("/:id", (0, auth_middleware_1.auth)("admin"), booking_controller_1.bookingControllers.deleteBooking);
exports.bookingRoutes = router;
