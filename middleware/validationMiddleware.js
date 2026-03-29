const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../validations/schemas.js");

// Validate listing data
module.exports.validateListing = (req, res, next) => {
  const { error } = (() => { console.log('DEBUG REQ BODY:', JSON.stringify(req.body)); return listingSchema.validate(req.body); })();
  if (error) {
    const errMsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};

// Validate review data
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};
