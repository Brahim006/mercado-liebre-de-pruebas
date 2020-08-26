const { check } = require("express-validator");
const bcrypt = require("bcrypt");
const dataModel = require("../utils/dataModel");
const usersModel = dataModel("users");

module.exports = [

    check("userName")
        .notEmpty().withMessage("Debe ingresar un nombre de usuario"),

    check("password")
        .notEmpty().withMessage("Debe ingresar una contraseña")

];