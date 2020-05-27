var express = require("express");
var router = express.Router();
const {
    createAlbumValidations,
} = require("../validationRules/album_validationRules");
const { index, show, store } = require("../controllers/album_controller");

router.get("/", index);
router.post("/", [createAlbumValidations], store);
router.get("/:albumId", show);

module.exports = router;
