const bcrypt = require("bcrypt");
const { User } = require("../../models");

const basic = async (req, res, next) => {
    console.log("I will do it");
    if (!req.headers.authorization) {
        res.status(401).send({
            status: "fail",
            message: "Authorization required",
        });
        return;
    }

    const [authSchema, base64Payload] = req.headers.authorization.split(" ");

    if (authSchema.toLowerCase() !== "basic") {
        next();
    }

    const decodedPayload = Buffer.from(base64Payload, "base64").toString(
        "ascii"
    );
    const [email, password] = decodedPayload.split(":");

    const user = await new User({ email }).fetch({ require: false });
    if (!user) {
        res.status(401).send({
            status: "fail",
            data: "Authorization failed",
        });
        return;
    }

    const hashedPassword = user.get("password");
    const checkTheHashedPassword = await bcrypt.compare(
        password,
        hashedPassword
    );
    if (!checkTheHashedPassword) {
        res.status(401).send({
            status: "fail",
            data: "Wrong password",
        });
        return;
    }

    req.user = user;

    next();
};

module.exports = {
    basic,
};
