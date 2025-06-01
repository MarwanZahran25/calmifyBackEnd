const express = require("express");
const path = require("node:path");
const verify = require("../utils/auth");
const noteController = require(path.join(__dirname, "../controllers/note"));
const router = express.Router();
router.post("/", verify.verifyUser, noteController.addNote);
router.get("/", verify.verifyUser, noteController.getUserNotes);
router.get("/all", verify.verifyAdmin, noteController.getAllNotes);
module.exports = router;
