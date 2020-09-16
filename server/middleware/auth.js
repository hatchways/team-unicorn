const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = function (req, res, next) {
  //get the token from the header
  const token = req.header("x-auth-token");

  // Check if not token exists : 401  not authorized
  if (!token)
    return res.status(401).json({ msg: "No token authoriazation denied" });

  // Verify token
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    req.student = decoded.student;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
