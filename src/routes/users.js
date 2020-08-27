const express = require("express");
const router =  express.Router();
const controller = require("../controllers/usersControllers");
const dataTrimmer = require("../middleWares/dataTrimmer");
const guestRoute = require("../middleWares/guestRoute");
const userRoute = require("../middleWares/userRoute");

// Trimmers
const registerDataTrimmer = dataTrimmer("name", "lastName", "userName", "email", "address");
const loginDataTrimmer = dataTrimmer("userName");

// Validators
const registerValidator = require("../validators/registerValidator");
const loginValidator = require("../validators/loginValidator");

router.get("/register", guestRoute, controller.register);
router.post("/register", registerDataTrimmer, registerValidator, controller.store);

router.get("/login", guestRoute, controller.login);
router.post("/login", loginDataTrimmer, loginValidator, controller.athenticate);

router.get("/logout", userRoute, controller.logout);

module.exports = router;