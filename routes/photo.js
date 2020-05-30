const express = require("express");
const router = express.Router();
const {
    index,
    show,
    store,
    destroy,
} = require("../controllers/photo_controller");
const {
    createPhotoValidations,
} = require("../validationRules/album_photo_validationRules");

//Get all photos
router.get("/", index);

//Get a specific photo
router.get("/:photoId", show);

// Store a single photo
// To store many photos use POST => ('/albums/:albumId/photos')
router.post("/", [createPhotoValidations], store);

//Update a specific photo
router.put("/:photoId");

//Destroy a specific photo
router.delete("/:photoId", destroy);

module.exports = router;
