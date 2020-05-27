const express = require("express");
const router = express.Router();
const { basic } = require("../controllers/middlewares/auth");
const { registerRules } = require("../validationRules/user_validationRules");
const { store } = require("../controllers/user_controller");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.send({ title: "It will not take more than 4 days" });
});

router.post("/register", [registerRules], store);

router.use(basic);

router.use("/users", require("./user"));
router.use("/photos", require("./photo"));
router.use("/albums", require("./album"));

module.exports = router;
