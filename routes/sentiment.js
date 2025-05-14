const { Router } = require("express");
const { prisma } = require("../utils/prismaExport");
const verify = require("../utils/auth");
const router = Router();
const sentimentController = require("../controllers/sentiment");
router.get("/", verify.verifyUser, sentimentController.getSentiment);
router.post("/", verify.verifyUser, sentimentController.addSentiment);
module.exports = router;
