const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

// Signup routes
router.route("/signup")
  .get(authController.renderSignupForm)
  .post(wrapAsync(authController.signup));

// Login routes
router.route("/login")
  .get(authController.renderLoginForm)
  .post(saveRedirectUrl, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), wrapAsync(authController.login));

// Logout route
router.get("/logout", authController.logout);

module.exports = router;
