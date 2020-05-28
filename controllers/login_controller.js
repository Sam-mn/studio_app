const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const login = async (req, res) => {
    const user = await new User({
        email: req.body.email,
    }).fetch({
        require: false,
    });

    if (!user) {
        res.status(401).send({
            status: "fail",
            data: "Authorization failed",
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
        sub: user.get("id"),
        email: user.get("email"),
    };

    var token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

    res.send({
        data: {
            token,
        },
    });
};

module.exports = {
    login,
};
