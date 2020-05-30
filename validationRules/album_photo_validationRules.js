const { body, check } = require("express-validator");

const createAlbumValidationsRules = [body("title").trim().isLength({ min: 2 })];
const updateAlbumValidationsRules = [body("title").trim().isLength({ min: 2 })];

const createPhotoValidationsRules = [
    check("title").trim().isLength({ min: 2 }),
    check("url").trim().isLength({ min: 5 }),
    check("comment").trim().optional().isLength({ min: 5 }),
];

const createManyPhotosValidationsRules = [
    check("photos.*.title").trim().isLength({ min: 2 }),
    check("photos.*.url").trim().isLength({ min: 5 }),
    check("photos.*.comment").trim().optional().isLength({ min: 5 }),
];

const updatingPhotoValidationsRules = [
    check("title").optional().trim().isLength({ min: 2 }),
    check("url").optional().trim().isLength({ min: 5 }),
    check("comment").optional().trim().isLength({ min: 5 }),
];

module.exports = {
    createAlbumValidationsRules,
    updateAlbumValidationsRules,
    createPhotoValidationsRules,
    createManyPhotosValidationsRules,
    updatingPhotoValidationsRules,
};
