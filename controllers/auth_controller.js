const login = async (res, req) => {
    res.send({
        status: "success",
        data: req.body,
    });
};

module.exports = {
    login,
};
