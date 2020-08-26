const express = require("express");
const router =  express.Router();
const controller = require("../controllers/usersControllers");
const dataTrimmer = require("../middleWares/dataTrimmer");

// Trimmers
const registerDataTrimmer = dataTrimmer("name", "lastName", "userName", "email", "address");
const loginDataTrimmer = dataTrimmer("name");

// Validators
const registerValidator = require("../validators/registerValidator");
const loginValidator = require("../validators/loginValidator");

router.get("/register", controller.register);
router.post("/register", registerDataTrimmer, registerValidator, controller.store);

router.get("/login", controller.login);
router.post("/login", loginDataTrimmer, loginValidator, controller.athenticate);

module.exports = router;