const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });
const wrapAsync = require("../utils/wrapAsync");
const reviewRoutes = require("./reviewRoutes");

// List and create property routes
router.route("/")
  .get(wrapAsync(propertyController.index))
  .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(propertyController.createListing));

// New property form route
router.get("/new", isLoggedIn, wrapAsync(propertyController.renderNewForm));

// Nested review routes
router.use("/:id/reviews", reviewRoutes);

// Show, update, delete single property
router.route("/:id")
  .get(wrapAsync(propertyController.showListing))
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(propertyController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(propertyController.deleteListing));

// Edit property form route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(propertyController.renderEditForm));

module.exports = router;
