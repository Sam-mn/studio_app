const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

/**
 * POST
 * Login and get the token
 */

const login = async (req, res) => {
    try {
        const user = await new User({
            email: req.body.email,
        }).fetch({
            require: false,
        });

        if (!user) {
            res.status(401).send({
                status: "fail",
                data: "User is not found",
            });
            return;
        }

        const hashedPassword = user.get("password");
        const checkTheHashedPassword = await bcrypt.compare(
            req.body.password,
            hashedPassword
        );

        if (!checkTheHashedPassword) {
            res.status(401).send({
                status: "fail",
                data: "Wrong password",
            });
            return;
        }

        const payload = {
            data: {
                id: user.get("id"),
                email: user.get("email"),
            },
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_LIFETIME || "1d",
        });

        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_LIFETIME || "1w",
            }
        );

        res.send({
            data: {
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Exception thrown in database when trying to login.",
        });
        throw error;
    }
};

/**
 * POST
 * get a new access token by refresh token
 */

const refreshToken = async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).send({
            status: "fail",
            data: "No token found in request headers.",
        });
        return;
    }

    const [authType, token] = req.headers.authorization.split(" ");

    if (authType.toLowerCase() !== "bearer") {
        res.status(401).send({
            status: "fail",
            data: "No token found in request headers.",
        });
        return;
    }
    try {
        const { data } = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        const payload = { data };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "1h",
        });

        res.send({
            status: "success",
            data: {
                accessToken,
            },
        });
    } catch (error) {
        res.status(403).send({
            status: "fail",
            data: "Invalid token.",
        });
        return;
    }
};

module.exports = {
    login,
    refreshToken,
};
