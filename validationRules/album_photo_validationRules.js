const { body } = require("express-validator");

const createAlbumValidations = [body("title").isLength({ min: 2 })];

const createPhotoValidations = [
    body("title").isLength({ min: 2 }),
    body("url").isLength({ min: 5 }),
    body("comment").optional().isLength({ min: 5 }),
];

module.exports = {
    createAlbumValidations,
    createPhotoValidations,
};
