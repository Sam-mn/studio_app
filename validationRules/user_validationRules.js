const { body } = require("express-validator");
const { User } = require("../models");

const registerRules = [
    body("email")
        .isLength({ min: 5 })
        .custom(async (value) => {
            const user = await new User({ email: value }).fetch({
                require: false,
            });
            if (user) {
                return Promise.reject("Username already exists.");
            }
            return Promise.resolve();
        }),
    body("password").isLength({ min: 5 }),
    body("first_name").isLength({ min: 3 }),
    body("last_name").isLength({ min: 3 }),
];

module.exports = {
    registerRules,
};
