const express = require("express");
const verify = require("../utils/auth");
const burnoutController = require("../controllers/burnout");
const router = express.Router();
router.get("/all", verify.verifyUser, burnoutController.getAllBurnout);
router.post("/new", verify.verifyUser, burnoutController.createBurnout);
module.exports = router;
