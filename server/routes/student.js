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
const keys = require("../config/keys");

const Student = require("../models/Student");

// @route  POST student/register
// @desc   register student
// @access public

router.post(
  "/register",
  registerValidationRules(),
  validate,
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // Student exists
      let isStudent = await Student.findOne({ email });
      if (isStudent) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Student already exists" }] });
      }
      let student = new Student({
        name,
        email,
        password
      });

      // Bcrypt password
      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);
      await student.save();

      // return jsonWebToken
      const payload = {
        student: {
          id: student.id,
          name: student.name,
          email: student.email
        }
      };

      jwt.sign(payload, keys.jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ token, student: payload.student });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  POST student/login
// @desc   login student
// @access public

router.post("/login", loginValidationRules(), validate, async (req, res) => {
  const { email, password } = req.body;
  try {
    // student exists , get the student from the database
    let student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).send({ errors: { msg: "Invalid credentials" } });
    }

    // Compare paswword - plain and encrypted
    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).send({ errors: { msg: "Invalid credentials" } });
    }

    // return jsonWebToken
    const payload = {
      student: {
        id: student.id,
        name: student.name,
        email: student.email
      }
    };

    jwt.sign(payload, keys.jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.cookie("token", token, { httpOnly: true });
      res.json({ token, student: payload.student });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
