const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviewController");
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

// Create review route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;
