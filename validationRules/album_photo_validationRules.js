const { body, check } = require("express-validator");

const createAlbumValidations = [body("title").isLength({ min: 2 })];

const createPhotoValidations = [
    check("´*.title").isLength({ min: 2 }),
    check("photos.*.url").isLength({ min: 5 }),
    check("photos.*.comment").optional().isLength({ min: 5 }),
];

module.exports = {
    createAlbumValidations,
    createPhotoValidations,
};
