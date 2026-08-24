// Centralized error handler. Any `next(error)` call in a controller ends up here.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error('[Error]', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong on the server.';

  res.status(statusCode).json({ error: message });
}

module.exports = errorHandler;