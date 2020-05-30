const { Album, User } = require("../models");
const { matchedData, validationResult } = require("express-validator");

const index = async (req, res) => {
    let user = null;
    try {
        user = await new User({ id: req.user.data.id }).fetch({
            withRelated: "album",
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(404);
        return;
    }

    const album = user.related("album");

    res.send({
        status: "success",
        album,
    });
};

const show = async (req, res) => {
    const albumId = req.params.albumId;
    const album = await new Album({ id: albumId }).fetch({
        withRelated: "photo",
    });

    if (album.get("user_id") !== req.user.data.id) {
        res.send({
            message: "It is not your album",
        });
        return;
    }

    res.send({
        status: "success",
        album,
    });
};

const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({
            status: "fail",
            data: errors.array(),
        });
        return;
    }

    const validData = matchedData(req);
    validData.user_id = req.user.data.id;

    try {
        const album = await new Album(validData).save();
        res.send({
            status: "success",
            data: { album },
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Exception thrown in database when creating a new album.",
        });
        throw error;
    }
};

const update = async (req, res) => {
    const album = await new Album({
        id: req.params.albumId,
        user_id: req.user.data.id,
    }).fetch({ require: false });
    if (!album) {
        res.status(404).send({
            status: "fail",
            data: "album Not Found",
        });
        return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({
            status: "fail",
            data: errors.array(),
        });
        return;
    }

    const validData = matchedData(req);

    try {
        const updatedAlbum = await album.save(validData);

        res.send({
            status: "success",
            data: {
                album: updatedAlbum,
            },
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Exception thrown in database when updating a album.",
        });
        throw error;
    }
};

const destroy = async (req, res) => {
    console.log("delete");
    const albumId = req.params.albumId;
    try {
        const album = await new Album({ id: albumId }).fetch({
            withRelated: "photo",
        });
        if (!album) {
            return;
        }
        await album.photo().detach();
        await new Album({ id: req.params.albumId }).destroy();
        res.send({
            status: "success",
            data: null,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Exception thrown in database when deleting an album.",
        });
        throw error;
    }
};
module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};
