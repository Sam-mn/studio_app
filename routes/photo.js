const express = require("express");
const router = express.Router();
const { index, show } = require("../controllers/photo_controller");

router.get("/", index);
router.get("/:photoId", show);

module.exports = router;
