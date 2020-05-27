module.exports = (bookshelf) => {
    return bookshelf.model(
        "User",
        {
            tableName: "users",
            album() {
                return this.hasMany("Album");
            },
        },
        {
            hashSaltRounds: 10,
        }
    );
};
