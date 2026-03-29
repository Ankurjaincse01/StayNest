// Async error wrapper - catches errors and passes to next()
module.exports = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
