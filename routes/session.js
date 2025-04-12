const express= require('express');
const verify = require("../utils/auth")
const router = express.Router();
const sessionController= require("../controllers/session");
router.get('/',sessionController.avilableSessions)
router.post('/reserve',verify,sessionController.reserveSession)
router.get('/user',verify,sessionController.currenUserSession)

module.exports = router;