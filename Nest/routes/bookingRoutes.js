const express = require("express");
const router = express.Router({ mergeParams: true });
const bookingController = require("../controllers/bookingController");
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

// Create new booking
router.post("/listings/:id/book", isLoggedIn, wrapAsync(bookingController.createBooking));

// View all bookings for current user
router.get("/my-bookings", isLoggedIn, wrapAsync(bookingController.showMyBookings));

// Cancel a booking
router.delete("/:id", isLoggedIn, wrapAsync(bookingController.cancelBooking));

module.exports = router;
