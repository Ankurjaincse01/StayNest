const ExpressError = require("../utils/ExpressError.js");

// Handle 404 errors
module.exports.notFoundHandler = (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
};

// Handle all errors
module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  
  if (err.name === "CastError") {
    err = new ExpressError(404, "Page not found");
  }

  res.status(statusCode).render("error.ejs", { err });
};
