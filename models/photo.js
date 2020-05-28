module.exports = (bookshelf) => {
    return bookshelf.model("Photo", {
        tableName: "photos",
        user() {
            return this.belongsTo("User");
        },

        album() {
            return this.belongsToMany("Album");
        },
    });
};
