const jwt = require("jsonwebtoken");

/**
 * Check the token before (/users, /albums, /photos) requests
 */

const checkTheToken = async (req, res, next) => {
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

    let payload = null;
    try {
        payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        res.status(403).send({
            status: "fail",
            data: "Authentication Failed.",
        });
        throw err;
    }

    req.user = payload;

    next();
};

module.exports = {
    checkTheToken,
};
