module.exports = (bookshelf) => {
    return bookshelf.model("User", {
        tableName: "users",
    });
};
