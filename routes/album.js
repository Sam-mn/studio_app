var express = require("express");
var router = express.Router();
const {
    createAlbumValidationsRules,
    updateAlbumValidationsRules,
    createManyPhotosValidationsRules,
    addManyPhotosValidationsRules,
} = require("../validationRules/album_photo_validationRules");
const {
    index,
    show,
    store,
    update,
    destroy,
} = require("../controllers/album_controller");

const {
    createAddPhotoToAlbum,
    deletePhotoFromAlbum,
    addManyPhotoToAlbum,
} = require("../controllers/photo_controller");

//Get all albums
router.get("/", index);

//Get a specific album
router.get("/:albumId", show);

// Store a single album
router.post("/", [createAlbumValidationsRules], store);

//Update a specific album
router.put("/:albumId", [updateAlbumValidationsRules], update);

// Store many new photos and relate it to a specific album
/** 
 ********* The structure **********
 * {"photos": [
{
	"title": "",
	"url": "",
	"comment": ""
},
{
	"title": "",
	"url": "",
	"comment": ""
}
]}
*/
router.post(
    "/:albumId/manyPhotos",
    [createManyPhotosValidationsRules],
    createAddPhotoToAlbum
);

//relate existing photos to an album
router.post(
    "/:albumId/photos",
    [addManyPhotosValidationsRules],
    addManyPhotoToAlbum
);

//Destroy a specific album
router.delete("/:albumId", destroy);

//Delete the relation between a photo and an album
router.delete("/:albumId/photos/:photoId", deletePhotoFromAlbum);

module.exports = router;
