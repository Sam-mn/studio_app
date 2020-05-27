const { User } = require("../models");
const { matchedData, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const show = async (req, res) => {
    if (!req.user) {
        res.status(401).send({
            status: "fail",
            message: "authentication required",
        });
    }

    // const user = await new models.User({ id: req.user.id }).fetch({
    //     withRelated: "album",
    // });
    res.send({
        status: "success",
        user: req.user,
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

    try {
        validData.password = await bcrypt.hash(
            validData.password,
            User.hashSaltRounds
        );
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Exception thrown when hashing the password.",
        });
        throw error;
    }

    try {
        const user = await new User(validData).save();
        res.status(201).send({
            status: "success",
            data: null,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Exception thrown in database when creating a new user.",
        });
        throw error;
    }
};

module.exports = {
    show,
    store,
};
