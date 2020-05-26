const models = require("../models");

const index = async (req, res) => {
    const photos = await models.Photo.fetchAll();
    res.send({
        status: "success",
        photos,
    });
};

const show = async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await new models.Photo({ id: photoId }).fetch();
    res.send({
        status: "success",
        photo,
    });
};

module.exports = {
    index,
    show,
};
