const express = require("express");
const router = express.Router();
const { checkTheToken } = require("../controllers/middlewares/auth");
const { login } = require("../controllers/login_controller");
const { registerRules } = require("../validationRules/user_validationRules");
const { store } = require("../controllers/user_controller");

// Get home page.
router.get("/", function (req, res, next) {
    res.send({ title: "It will not take more than 4 days" });
});

// add ability to register
router.post("/register", [registerRules], store);

// add ability to login and get JWT access-token and refresh token
router.post("/login", login);

// add ability to validate JWT's
router.use(checkTheToken);
router.use("/users", require("./user"));
router.use("/photos", require("./photo"));
router.use("/albums", require("./album"));

module.exports = router;
