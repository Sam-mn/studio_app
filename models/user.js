module.exports = (bookshelf) => {
    return bookshelf.model(
        "User",
        {
            tableName: "users",
            album() {
                return this.hasMany("Album");
            },
            photo() {
                return this.hasMany("Photo");
            },
        },
        {
            hashSaltRounds: 10,
        }
    );
};
