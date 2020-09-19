const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validate,
  createValidationRules,
  authenticateValidationRules,
} = require("../middleware/validator");
const keys = require("../config/keys");

const User = require("../models/User");

// TODO: Find a more appropriate place to put this?
// Auth token time-to-live in ms.
const AuthTokenTTL = 7 * 24 * 60 * 60 * 1000;

// @route  POST user/create
// @desc   Create a new user
// @access public

router.post("/create", createValidationRules(), validate, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // User exists
    let isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(403).send({ message: "Email is already in use!" });
    }

    // Create new user
    let user = new User({
      name,
      email,
      password,
    });

    // Bcrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(201).json();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST user/authenticate
// @desc   Authenticate user
// @access public

router.post(
  "/authenticate",
  authenticateValidationRules(),
  validate,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      // user exists , get the user from the database
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Account doesn't exist" });
      }

      // Compare paswword - plain and encrypted
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Remove sensitive information from payload and
      // issue jwt.
      const payload = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      jwt.sign(
        payload,
        keys.jwtSecret,
        { expiresIn: AuthTokenTTL },
        (err, token) => {
          if (err) throw err;
          res.cookie("auth-token", token, { httpOnly: true });
          res.json({ token, user: payload.user });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// @route GET user/session/extend
// @route GET user/session/resolve

module.exports = router;
