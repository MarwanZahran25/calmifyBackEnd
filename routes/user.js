const express = require("express");
const path = require("node:path");
const verify = require("../utils/auth");
const productivityController = require("../controllers/productivity");
userController = require(path.join(__dirname, "../controllers/user"));
const router = express.Router();

/* GET users listing. */
router.get('/',verify,userController.employeeInfo);
router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);
router.post("/logout", verify,userController.logOut);

module.exports = router;
