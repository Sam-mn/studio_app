module.exports = (bookshelf) => {
    return bookshelf.model("Album", {
        tableName: "albums",
    });
};
