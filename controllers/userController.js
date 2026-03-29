const User = require("../models/user");

// Get user profile information
module.exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.render("users/profile.ejs", { user });
  } catch (e) {
    req.flash("error", "Error retrieving profile");
    res.redirect("/listings");
  }
};

// Update user profile information
module.exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    await User.findByIdAndUpdate(req.user._id, { name, email }, { new: true });
    req.flash("success", "Profile updated successfully!");
    res.redirect("/user/profile");
  } catch (e) {
    req.flash("error", "Error updating profile");
    res.redirect("/user/profile");
  }
};

