const { body, check } = require("express-validator");
const { Photo } = require("../models");

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

const addManyPhotosValidationsRules = [
    body("photo_id")
        .isArray()
        .custom(async (values) => {
            if (!values.every(Number.isInteger)) {
                return Promise.reject("Invalid value in array.");
            }

            for (let i = 0; i < values.length; i++) {
                const photo = await new Photo({ id: values[i] }).fetch({
                    require: false,
                });
                if (!photo) {
                    return Promise.reject(`Photo ${values[i]} does not exist.`);
                }
            }
        }),
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
    addManyPhotosValidationsRules,
    updatingPhotoValidationsRules,
};
