const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Allow 10 requests per hour
  message: { error: "Too many requests, please try again later." }
});

module.exports = limiter;
