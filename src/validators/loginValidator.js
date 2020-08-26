const { check } = require("express-validator");

module.exports = [

    check("userName")
        .notEmpty().withMessage("Debe ingresar un nombre de usuario"),

    check("password")
        .notEmpty().withMessage("Debe ingresar una contraseña")

];