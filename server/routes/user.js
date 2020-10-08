const express = require("express");
const router = express.Router();

const authenticator = require("../middleware/authenticator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const {
  validate,
  createValidationRules,
  authenticateValidationRules,
} = require("../middleware/validator");

const User = require("../models/User");

const EmailSender = require('./api/email');
const SUBJECT = 'Thank you for signing up!'
const emailText = (name) => `Thank you for Signing up for our Kanban Board app: ${name}. We really appreciate it!`
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

  const token = jwt.sign(payload, process.env.JWTSECRET, {
    expiresIn: AuthTokenTTL,
  });

  return { payload, token };
};

// @route  POST user/create
// @desc   Create a new user
// @access public
router.post("/create", createValidationRules(), validate, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // User exists
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res
        .status(409)
        .json({ errors: { EMAIL_IN_USE: "Email is already in use!" } });
    }

    // Create new user
    const user = new User({
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

    //send user notification that they signed up
    const message = await EmailSender.createMessage(email, SUBJECT, emailText(name))
    EmailSender.sendEmail(message)

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
      const user = await User.findOne({ email });
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
router.post("/session/extend", authenticator, async (req, res) => {
  // NOTE: Auth middleware will verify jwt and attach user from db
  //       if there is one.
  try {
    const { payload: user, token } = issueJWT(req.user);
    res.cookie("auth-token", token, { httpOnly: true });
    res.status(200).json({ user });
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
router.get("/session/resolve", authenticator, async (req, res) => {
  const { user } = req;
  res.json({ user });
});

// @route POST user/session/end
// @desc   Invalidate jwt and end user session.
// @access Authenticated
router.post("/session/end", authenticator, async (req, res) => {
  try {
    res.clearCookie("auth-token");
    res.status(200).end();
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ errors: { DEFAULT_SERVER_ERROR: "Something went wrong..." } });
  }
});

module.exports = router;
