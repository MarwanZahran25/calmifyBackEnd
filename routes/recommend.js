const express = require("express");
const verify = require("../utils/auth");
const router = express.Router();
const recommendController = require("../controllers/recommend");
router.get("/all", verify.verifyUser, recommendController.all);
router.post("/new", verify.verifyUser, recommendController.recommend);
module.exports = router;
