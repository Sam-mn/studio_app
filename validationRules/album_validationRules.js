const { body } = require("express-validator");

const createAlbumValidations = [body("title").isLength({ min: 2 })];

module.exports = {
    createAlbumValidations,
};
