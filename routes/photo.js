const express = require("express");
const router = express.Router();
const {
    index,
    show,
    store,
    update,
    destroy,
} = require("../controllers/photo_controller");
const {
    createPhotoValidationsRules,
    updatingPhotoValidationsRules,
} = require("../validationRules/album_photo_validationRules");

//Get all photos
router.get("/", index);

//Get a specific photo
router.get("/:photoId", show);

// Store a single photo
// To store many photos use POST => ('/albums/:albumId/manyPhotos')
router.post("/", [createPhotoValidationsRules], store);

//Update a specific photo
router.put("/:photoId", [updatingPhotoValidationsRules], update);

//Destroy a specific photo
router.delete("/:photoId", destroy);

module.exports = router;
