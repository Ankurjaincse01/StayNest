const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// Create new review for a property listing
module.exports.createReview = async (req, res) => {
  console.log("DEBUG: Review request body:", req.body);
  console.log("DEBUG: Listing ID:", req.params.id);
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    throw new Error("Listing not found");
  }
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  req.flash("success", "Review created!");
  res.redirect(`/listings/${listing._id}`);
};

// Delete existing review from a property listing
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
