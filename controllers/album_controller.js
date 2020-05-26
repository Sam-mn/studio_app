const { Album } = require("../models");

const index = async (req, res) => {
    const albums = await Album.fetchAll();
    res.send({
        status: "success",
        albums,
    });
};

const show = async (req, res) => {
    const albumId = req.params.albumId;
    const album = await new Album({ id: albumId }).fetch();

    res.send({
        status: "success",
        album,
    });
};

module.exports = {
    index,
    show,
};
