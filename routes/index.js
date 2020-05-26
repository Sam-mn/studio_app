var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.send({ title: "It will not take more than 4 days" });
});

router.use("/users", require("./user"));
router.use("/photos", require("./photo"));
router.use("/albums", require("./album"));

module.exports = router;
