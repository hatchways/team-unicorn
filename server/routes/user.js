const express = require("express");
const router = express.Router();

const auth = require("../middleware/authenticator");

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

const issueJWT = (user) => {
  // Remove sensitive information from payload and
  // issue jwt.
  const payload = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };

  const token = jwt.sign(payload, keys.jwtSecret, { expiresIn: AuthTokenTTL });

  return { payload, token };
};

// @route  POST user/create
// @desc   Create a new user
// @access public
router.post("/create", createValidationRules(), validate, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // User exists
    let isUser = await User.findOne({ email });
    if (isUser) {
      return res
        .status(409)
        .json({ errors: { EMAIL_IN_USE: "Email is already in use!" } });
    }

    // Create new user
    let user = new User({
      name,
      email,
    });

    // Bcrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const { payload, token } = issueJWT(user);

    res.cookie("auth-token", token, { httpOnly: true });
    res.status(201).json(payload);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ errors: { DEFAULT_SERVER_ERROR: "Something went wrong..." } });
  }
});

// @route  POST user/authenticate
// @desc   Authenticate user
// @access public
// TODO: Set www authenticate header to basic?
router.post(
  "/authenticate",
  authenticateValidationRules(),
  validate,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      // user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ errors: { DNE_USER: "Account doesn't exist" } });
      }

      // Compare paswword - plain and encrypted
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ errors: { INCORRECT_PASSWORD: "Invalid credentials" } });
      }

      const { payload, token } = issueJWT(user);
      res.cookie("auth-token", token, { httpOnly: true });
      res.json(payload);
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ errors: { DEFAULT_SERVER_ERROR: "Something went wrong..." } });
    }
  }
);

// @route   POST user/session/extend
// @desc    Extend user's session if authorized.
// @access  Authenticated
//TODO: Invalidate old token?
router.post("/session/extend", auth, async (req, res) => {
  // NOTE: Auth middleware will verify jwt and decode user from jwt
  //       if there is a valid jwt.
  const payload = {
    user: req.user,
  };

  try {
    jwt.sign(
      payload,
      keys.jwtSecret,
      { expiresIn: AuthTokenTTL },
      (err, token) => {
        if (err) throw err;
        res.cookie("auth-token", token, { httpOnly: true });
        res.json({ user: payload.user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ errors: { DEFAULT_SERVER_ERROR: "Something went wrong..." } });
  }
});

// @route GET  user/session/resolve
// @desc   Resolve which user owns the jwt if exists.
// @access Authenticated
router.get("/session/resolve", auth, async (req, res) => {
  const { user } = req;
  res.json({ user });
});

// @route POST user/session/end
// @desc   Invalidate jwt and end user session.
// @access Authenticated
module.exports = router;
