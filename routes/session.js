const express = require("express");
const verify = require("../utils/auth");
const router = express.Router();
const sessionController = require("../controllers/session");
router.get("/", sessionController.availableSessions);
router.post("/reserve", verify.verifyUser, sessionController.reserveSession);
router.get("/user", verify.verifyUser, sessionController.currentUserSession);

module.exports = router;
