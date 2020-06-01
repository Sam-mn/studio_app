const { Photo, User, Album } = require("../models");
const { matchedData, validationResult } = require("express-validator");

/**
 * GET
 * Get all photos
 */

const index = async (req, res) => {
    try {
        user = await new User({ id: req.user.data.id }).fetch({
            withRelated: "photo",
        });

        const photos = user.related("photo");

        res.send({
            status: "success",
            data: { photos },
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message:
                "Exception thrown in database when trying to get all photos.",
        });
        throw error;
    }
};

/**
 *  GET
 * Get a specific photo
 */

const show = async (req, res) => {
    const photoId = req.params.photoId;
    try {
        const photo = await new Photo({
            id: photoId,
            user_id: req.user.data.id,
        }).fetch({
            require: false,
        });

        if (!photo) {
            res.status(404).send({
                status: "fail",
                message: `Photo with id: ${photoId} is not found`,
            });
            return;
        }

        res.send({
            status: "success",
            data: { photo },
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Exception thrown in database when trying to get a photo.",
        });
        throw error;
    }
};

/**
 *  POST
 * Store a new photo
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
        const photo = await new Photo(validData).save();

        res.send({
            status: "success",
            data: {
                photo,
            },
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message:
                "Exception thrown in database when trying to create a new photo.",
        });
        throw error;
    }
};

/**
 * PUT
 * Update a specific photo
 */

const update = async (req, res) => {
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
        const photo = await new Photo({
            id: req.params.photoId,
            user_id: req.user.data.id,
        }).fetch({ require: false });

        if (!photo) {
            res.status(404).send({
                status: "fail",
                message: `Photo with id: ${photoId} is not found`,
            });
            return;
        }

        const updatedPhoto = await photo.save(validData);

        res.send({
            status: "success",
            data: {
                photo: updatedPhoto,
            },
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message:
                "Exception thrown in database when trying to update a photo.",
        });
        throw error;
    }
};

/**
 * DELETE
 * Delete a specific photo
 */

const destroy = async (req, res) => {
    const photoId = req.params.photoId;
    try {
        const photo = await new Photo({
            id: photoId,
            user_id: req.user.data.id,
        }).fetch({
            withRelated: "album",
            require: false,
        });

        if (!photo) {
            res.status(404).send({
                status: "fail",
                message: `Photo with id: ${photoId} is not found`,
            });
            return;
        }

        await photo.album().detach();
        await photo.destroy();

        res.send({
            status: "success",
            data: null,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message:
                "Exception thrown in database when trying to delete a photo.",
        });
        throw error;
    }
};

/**
 * POST
 * relate new photos to an album
 */

const createAddPhotoToAlbum = async (req, res) => {
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
        validData.photos.forEach(async (data) => {
            data.user_id = req.user.data.id;

            const album = await new Album({
                id: req.params.albumId,
                user_id: req.user.data.id,
            }).fetch({
                withRelated: "photo",
                require: false,
            });
            if (!album) {
                res.status(403).send({
                    status: "fail",
                    message: `You do not have an album with id ${req.params.albumId}`,
                });
                return;
            }

            const photo = await new Photo(data).save();

            await album.photo().attach(photo);

            res.send({
                status: "success",
                data: null,
            });
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message:
                "Exception thrown in database when trying to create and relate new photos to an existing album.",
        });
        throw error;
    }
};

/**
 * POST
 * relate many existing photos to an album
 */

const addManyPhotoToAlbum = async (req, res) => {
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
        }).fetch({ withRelated: "photo", require: false });

        if (!album) {
            res.status(404).send({
                status: "fail",
                message: `Album with id: ${albumId} is not found`,
            });
            return;
        }

        validData.photo_id.forEach(async (value) => {
            const photo = await new Photo({
                id: value,
                user_id: req.user.data.id,
            }).fetch({ require: false });

            if (!photo) {
                res.status(404).send({
                    status: "fail",
                    message: `Photo with id: ${value} is not found`,
                });
                return;
            }

            await album.photo().attach(photo);
        });
        res.send({
            status: "success",
            data: null,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message:
                "Exception thrown in database when trying to relate existing photos to an existing album.",
        });
        throw error;
    }
};

/**
 * Delete a specific photo from a specific album
 */

const deletePhotoFromAlbum = async (req, res) => {
    const photoId = req.params.photoId;
    const albumId = req.params.albumId;

    try {
        const photo = await new Photo({
            id: photoId,
            user_id: req.user.data.id,
        }).fetch({ withRelated: "album", require: false });
        const album = await new Album({
            id: albumId,
            user_id: req.user.data.id,
        }).fetch({ withRelated: "photo", require: false });

        if (!photo || !album) {
            res.status(403).send({
                status: "fail",
                message: `Fail when trying to get album & photo (NOT FOUND)`,
            });
            return;
        }
        await album.photo().detach(photo);

        res.send({
            status: "success",
            data: null,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message:
                "Exception thrown in database when trying to delete the relation between photo and album.",
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
    createAddPhotoToAlbum,
    addManyPhotoToAlbum,
    deletePhotoFromAlbum,
};
