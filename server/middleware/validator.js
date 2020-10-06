const { body, validationResult } = require("express-validator");

exports.createValidationRules = () => {
  return [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Please enter a password with 8 or more characters"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),
  ];
};

exports.authenticateValidationRules = () => {
  return [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").not().isEmpty().withMessage("Password is required"),
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
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach((err) => {
      errors[err.param] = err.msg;
    });
    return res.status(400).json({ errors });
  }
  return next();
};
