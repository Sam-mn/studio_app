const knex = require("knex")({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || "studio_app",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "studio_app",
    },
});

const bookshelf = require("bookshelf")(knex);
const User = require("./user")(bookshelf);
const Photo = require("./photo")(bookshelf);
const Album = require("./album")(bookshelf);

module.exports = {
    bookshelf,
    User,
    Photo,
    Album,
};
