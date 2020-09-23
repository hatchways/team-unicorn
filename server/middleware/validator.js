const { body, validationResult } = require("express-validator");

exports.registerValidationRules = () => {
  return [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please include a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Please enter a password with 6 or more characters"),
    body("confirmPassword").custom((value, { req, loc, path }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    })
  ];
};

exports.loginValidationRules = () => {
  return [
    body("email").isEmail().withMessage("Please include a valid email"),
    body("password").not().isEmpty().withMessage("Password is required")
  ];
};

exports.boardValidationRules = () => {
  return [
    body("name").not().isEmpty().withMessage("Please enter title of the board")
  ];
};

exports.columnValidationRules = () => {
  return [
    body("name").not().isEmpty().withMessage("Please enter title of the column")
  ];
};

exports.cardValidationRules = () => {
  return [
    body("name").not().isEmpty().withMessage("Please enter title of the card")
  ];
};

exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let error = {};
    errors.array().forEach((err) => {
      error[err.param] = err.msg;
    });
    return res.status(400).json({ error });
  }
  return next();
};
