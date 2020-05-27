var express = require("express");
var router = express.Router();
const { show } = require("../controllers/user_controller");

router.get("/", show);

module.exports = router;
