const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");

// Check if user is property owner
module.exports.isOwner = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You don't have permission!");
    return res.redirect(`/listings/${id}`);
  }
  next();
});

// Check if user is review author
module.exports.isReviewAuthor = wrapAsync(async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You don't have permission!");
    return res.redirect(`/listings/${id}`);
  }
  next();
});
