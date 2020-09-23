const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validate,
  registerValidationRules,
  loginValidationRules
} = require("../middleware/validator");

const User = require("../models/User");

// @route  POST user/register
// @desc   register user
// @access public

router.post(
  "/register",
  registerValidationRules(),
  validate,
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // user exists
      let isUser = await User.findOne({ email });
      if (isUser) {
        return res
          .status(400)
          .send({ errors: [{ msg: "User already exists" }] });
      }
      let user = new User({
        name,
        email,
        password
      });

      // Bcrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // return jsonWebToken
      const payload = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };

      jwt.sign(payload, process.local.jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ token, user: payload.user });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  POST user/login
// @desc   login user
// @access public

router.post("/login", loginValidationRules(), validate, async (req, res) => {
  const { email, password } = req.body;
  try {
    // user exists , get the user from the database
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ errors: { msg: "Invalid credentials" } });
    }

    // Compare paswword - plain and encrypted
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ errors: { msg: "Invalid credentials" } });
    }

    // return jsonWebToken
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };

    jwt.sign(payload, process.env.jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.cookie("token", token, { httpOnly: true });
      res.json({ token, user: payload.user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
