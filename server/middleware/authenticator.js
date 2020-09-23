const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");

//  TODO: Refactor cookie name "auth-token" into constans
//  TODO: Refactor error codes/messages into constants
module.exports = async function (req, res, next) {
  // Get token from http-only cookie
  const token = req.cookies["auth-token"];

  // Check if not token exists : 401  not authorized
  // TODO: Set www authenticate header to basic?
  if (!token)
    return res
      .status(401)
      .json({ errors: { NO_AUTH_TOKEN: "No authorization token." } });

  // Verify token
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      res.status(404).json({ errors: { DNE: "User not found." } });
    }
    req.user = user;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ errors: { INVALID_AUTH_TOKEN: "Token is invalid or expired." } });
  }
};
