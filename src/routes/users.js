const express = require("express");
const router =  express.Router();
const controller = require("../controllers/usersControllers");
const dataTrimmer = require("../middleWares/dataTrimmer");

const registerDataTrimmer = dataTrimmer("name", "lastName", "userName", "email", "address",);
const loginDataTrimmer = dataTrimmer("name");

router.get("/register", controller.register);
router.post("/register", registerDataTrimmer, controller.store);

router.get("/login", controller.login);
router.post("/login", loginDataTrimmer, controller.processLogin);

module.exports = router;