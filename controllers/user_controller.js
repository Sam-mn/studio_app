const models = require("../models");

const index = async (req, res) => {
    const users = await models.User.fetchAll();
    res.send({
        status: "success",
        users,
    });
};

module.exports = {
    index,
};
