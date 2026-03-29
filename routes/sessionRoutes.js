const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

// My bookings route
router.get("/my-bookings", isLoggedIn, wrapAsync(bookingController.showMyBookings));

// Create booking route
router.post("/:id/create", isLoggedIn, wrapAsync(bookingController.createBooking));

// Cancel booking route
router.post("/:id/cancel", isLoggedIn, wrapAsync(bookingController.cancelBooking));

module.exports = router;
