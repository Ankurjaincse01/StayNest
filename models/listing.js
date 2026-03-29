const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  geometry: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] },
  },
  category: String,
  ownerType: String,
});

module.exports = mongoose.model("Listing", listingSchema);
