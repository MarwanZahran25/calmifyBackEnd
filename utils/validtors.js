const { body, validationResult } = require("express-validator");

function signupValidatorFunc() {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("email can't be empty")
      .isEmail()
      .withMessage("you didn't enter a valid email"),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters long"),
  ];
}
function errorValidator(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.errors[0].msg);
  }

  next();
}

module.exports = { signupValidatorFunc, errorValidator };
