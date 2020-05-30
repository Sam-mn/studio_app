var express = require("express");
var router = express.Router();
const {
    createAlbumValidationsRules,
    updateAlbumValidationsRules,
    createManyPhotosValidationsRules,
} = require("../validationRules/album_photo_validationRules");
const {
    index,
    show,
    store,
    update,
    destroy,
} = require("../controllers/album_controller");
const { addPhotoToAlbum } = require("../controllers/photo_controller");

//Get all albums
router.get("/", index);

//Get a specific album
router.get("/:albumId", show);

// Store a single album
router.post("/", [createAlbumValidationsRules], store);

//Update a specific album
router.put("/:albumId", [updateAlbumValidationsRules], update);

// Store many photos and relate it to a specific album
router.post(
    "/:albumId/photos",
    [createManyPhotosValidationsRules],
    addPhotoToAlbum
);

//Destroy a specific album
router.delete("/:albumId", destroy);

router.delete("/:albumId/photos/:photoId");

module.exports = router;
