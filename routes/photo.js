const express = require("express");
const router = express.Router();
const { index, show, store } = require("../controllers/photo_controller");
const {
    createPhotoValidations,
} = require("../validationRules/album_photo_validationRules");

router.get("/", index);
router.post("/", [createPhotoValidations], store);
router.get("/:photoId", show);

module.exports = router;
