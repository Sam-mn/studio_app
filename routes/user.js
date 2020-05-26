var express = require("express");
var router = express.Router();
const { index } = require("../controllers/user_controller");

router.get("/", index);

module.exports = router;
