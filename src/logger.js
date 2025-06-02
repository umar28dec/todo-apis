const morgan = require("morgan");

const ENABLE_LOGGING = process.env.ENABLE_LOGGING === "true";

// Morgan middleware for detailed request logging
function requestLogger() {
  if (ENABLE_LOGGING) {
    return morgan(
      ":method :url :status :res[content-length] - :response-time ms :remote-addr :user-agent"
    );
  }
  // No-op middleware if logging is disabled
  return (req, res, next) => next();
}

// Error-handling middleware for detailed error logs
function errorLogger(err, req, res, next) {
  if (ENABLE_LOGGING) {
    console.error("Error occurred:", err.stack || err);
  }
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(ENABLE_LOGGING && { stack: err.stack }),
  });
}

module.exports = {
  requestLogger,
  errorLogger,
};
