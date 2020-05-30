const { Photo, User, Album } = require("../models");
const { matchedData, validationResult } = require("express-validator");

const index = async (req, res) => {
    let user = null;
    try {
        user = await new User({ id: req.user.data.id }).fetch({
            withRelated: "photo",
        });
    } catch (error) {
        res.sendStatus(404);
        return;
    }

    const photo = user.related("photo");
    res.send({
        status: "success",
        photo,
    });
};

const show = async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await new Photo({ id: photoId }).fetch({
        require: false,
    });

    if (photo.get("user_id") !== req.user.data.id) {
        res.send({
            message: "It is not your photo",
        });
        return;
    }
    res.send({
        status: "success",
        photo,
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
            message: "Exception thrown in database when creating a new photo.",
        });
        throw error;
    }
};

const update = async (req, res) => {
    const photo = await new Photo({
        id: req.params.photoId,
        user_id: req.user.data.id,
    }).fetch({ require: false });
    if (!photo) {
        res.status(404).send({
            status: "fail",
            data: "Photo Not Found",
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
            message: "Exception thrown in database when updating a photo.",
        });
        throw error;
    }
};

const addPhotoToAlbum = async (req, res) => {
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
        validData.photos.forEach(async (element) => {
            element.user_id = req.user.data.id;

            const photo = await new Photo(element).save();
            const album = await new Album({
                id: req.params.albumId,
            }).fetch({
                withRelated: "photo",
            });
            if (!album) {
                res.status(403).send({
                    status: "fail",
                    message: `You do not have an album with id ${req.params.albumId}`,
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
                "Exception thrown in database when creating a new related photo.",
        });
        throw error;
    }
};

const destroy = async (req, res) => {
    const photoId = req.params.photoId;
    try {
        const photo = await new Photo({
            id: photoId,
            user_id: req.user.data.id,
        }).fetch({
            withRelated: "album",
        });
        if (!photo) {
            res.status(403).send({
                status: "fail",
                message: "there is no photo with this id.",
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
            message: "Exception thrown in database when deleting a photo.",
        });
        throw error;
    }
};

module.exports = {
    index,
    show,
    store,
    update,
    addPhotoToAlbum,
    destroy,
};
