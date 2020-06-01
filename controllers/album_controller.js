const { Album, User } = require("../models");
const { matchedData, validationResult } = require("express-validator");

/**
 * GET
 * Get all albums
 */

const index = async (req, res) => {
    try {
        user = await new User({ id: req.user.data.id }).fetch({
            withRelated: "album",
        });

        const albums = user.related("album");

        res.send({
            status: "success",
            data: { albums },
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message:
                "Exception thrown in database when trying to get all albums.",
        });
        throw error;
    }
};

/**
 *  GET
 * Get a specific album
 */

const show = async (req, res) => {
    const albumId = req.params.albumId;
    try {
        const album = await new Album({
            id: albumId,
            user_id: req.user.data.id,
        }).fetch({
            withRelated: "photo",
            require: false,
        });

        if (!album) {
            res.status(404).send({
                status: "fail",
                message: `Album with id: ${albumId} is not found`,
            });
            return;
        }

        res.send({
            status: "success",
            data: { album },
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Exception thrown in database when trying to get album.",
        });
        throw error;
    }
};

/**
 *  POST
 * Store a new album
 */

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
            message:
                "Exception thrown in database when trying to create a new album.",
        });
        throw error;
    }
};

/**
 * PUT
 * Update a specific album
 */

const update = async (req, res) => {
    const albumId = req.params.albumId;
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
        const album = await new Album({
            id: albumId,
            user_id: req.user.data.id,
        }).fetch({ require: false });

        if (!album) {
            res.status(404).send({
                status: "fail",
                data: `Album with id: ${albumId} is not found`,
            });
            return;
        }
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
            message:
                "Exception thrown in database when trying to update an album.",
        });
        throw error;
    }
};

/**
 * DELETE
 * Delete a specific album
 */

const destroy = async (req, res) => {
    const albumId = req.params.albumId;

    try {
        const album = await new Album({ id: albumId }).fetch({
            withRelated: "photo",
            require: false,
        });

        if (!album) {
            res.status(404).send({
                status: "fail",
                message: `Album with id: ${albumId} is not found`,
            });
            return;
        }

        await album.photo().detach();
        await album.destroy();

        res.send({
            status: "success",
            data: null,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message:
                "Exception thrown in database when trying to delete an album.",
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
