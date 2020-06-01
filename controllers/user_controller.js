const { User } = require("../models");
const { matchedData, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

/**
 * Get
 * Show the user name and email
 */
const show = async (req, res) => {
    if (!req.user) {
        res.status(401).send({
            status: "fail",
            message: "authentication required",
        });
        return;
    }

    const user = await new User({ id: req.user.data.id }).fetch({
        require: false,
    });

    res.send({
        status: "success",
        data: {
            first_name: user.get("first_name"),
            last_name: user.get("last_name"),
            email: user.get("email"),
        },
    });
};

/**
 * POST
 * register a new user
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

    try {
        validData.password = await bcrypt.hash(
            validData.password,
            User.hashSaltRounds
        );
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Exception thrown when trying to hash the password.",
        });
        throw error;
    }

    try {
        await new User(validData).save();

        res.status(201).send({
            status: "success",
            data: null,
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message:
                "Exception thrown in database when trying to create a new user.",
        });
        throw error;
    }
};

module.exports = {
    show,
    store,
};
