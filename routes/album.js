var express = require("express");
var router = express.Router();
const {
    createAlbumValidations,
    createPhotoValidations,
} = require("../validationRules/album_photo_validationRules");
const {
    index,
    show,
    store,
    destroy,
} = require("../controllers/album_controller");
const { addPhotoToAlbum } = require("../controllers/photo_controller");

router.get("/", index);
router.post("/", [createAlbumValidations], store);
router.get("/:albumId", show);
router.post("/:albumId/photos", [createPhotoValidations], addPhotoToAlbum);
router.delete("/:albumId", destroy);
router.delete("/:albumId/photos/:photoId");

module.exports = router;
