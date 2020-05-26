var express = require("express");
var router = express.Router();
const { index, show } = require("../controllers/album_controller");

router.get("/", index);
router.get("/:albumId", show);

module.exports = router;
