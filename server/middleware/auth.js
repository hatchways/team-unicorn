const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = function (req, res, next) {
  // Get token from http-only cookie
  const token = req.cookies["auth-token"];

  // Check if not token exists : 401  not authorized
  if (!token)
    return res.status(401).json({ errorMessage: "No authorization token." });

  // Verify token
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ errorMessage: "Token is invalid or expired." });
  }
};
