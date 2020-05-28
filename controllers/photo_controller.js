const { Photo, User } = require("../models");
const { matchedData, validationResult } = require("express-validator");

const index = async (req, res) => {
    let user = null;
    try {
        user = await new User({ id: req.user.id }).fetch({
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
    validData.user_id = req.user.id;

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

const show = async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await new Photo({ id: photoId }).fetch({
        require: false,
    });

    if (photo.get("user_id") !== req.user.id) {
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

module.exports = {
    index,
    store,
    show,
};
