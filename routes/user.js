const express = require("express");
const path = require("node:path");
const verify = require("../utils/auth");
const userController = require(path.join(__dirname, "../controllers/user"));
const router = express.Router();
const { errorValidator, signupValidatorFunc } = require("../utils/validtors");

/* GET users listing. */
router.get("/", verify, userController.employeeInfo);
router.post(
  "/signup",
  signupValidatorFunc(),
  errorValidator,
  userController.signUp
);
router.post("/login", userController.logIn);
router.post("/logout", verify, userController.logOut);

module.exports = router;
