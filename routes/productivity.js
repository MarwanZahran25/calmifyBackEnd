const express = require("express");
const { prisma } = require("../utils/prismaExport");
const verify = require("../utils/auth");
const productivityController = require("../controllers/productivity");
const router = express.Router();
/* GET home page. */
router.get("/", verify.verifyUser, productivityController.productivity);
router.get(
  "/average",
  verify.verifyUser,
  productivityController.averageProductivity
);

module.exports = router;
