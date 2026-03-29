const Booking = require("../models/booking");
const Listing = require("../models/listing");

// Create new booking for a property listing
module.exports.createBooking = async (req, res) => {
  const { id } = req.params;
  const { checkIn, checkOut, guests } = req.body;
  
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  if (nights <= 0) {
    req.flash("error", "Check-out date must be after check-in date");
    return res.redirect(`/listings/${id}`);
  }

  const subtotal = listing.price * nights;
  const serviceFee = subtotal * 0.1;
  const totalPrice = subtotal + serviceFee;

  const booking = new Booking({
    listing: id,
    user: req.user._id,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: guests,
    totalPrice: totalPrice,
  });

  await booking.save();
  req.flash("success", "Booking confirmed successfully!");
  return res.redirect("/bookings/my-bookings");
};

// Get all bookings for current user
module.exports.showMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing")
    .sort({ createdAt: -1 });
  res.render("bookings/index.ejs", { bookings });
};

// Cancel an existing booking
module.exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  await Booking.findByIdAndUpdate(id, { status: "cancelled" });
  req.flash("success", "Booking cancelled successfully");
  return res.redirect("/bookings/my-bookings");
};
