const { Album, User } = require("../models");

const index = async (req, res) => {
    let user = null;
    try {
        user = await new User({ id: req.user.id }).fetch({
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
};

const store = async (req, res) => {
    res.send("STORE");
};

module.exports = {
    index,
    show,
    store,
};
