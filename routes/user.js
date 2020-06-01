var express = require("express");
var router = express.Router();
const { show } = require("../controllers/user_controller");

//show the user name and email
router.get("/", show);

module.exports = router;
