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
    destroy,
};
