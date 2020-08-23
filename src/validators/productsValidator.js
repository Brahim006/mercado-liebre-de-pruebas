/**
 * Validator para el formulario de creación/edición de productos,
 */
const { check, body } = require("express-validator");

module.exports = [

    check("name")
        .notEmpty().withMessage("Debes ingresar un nombre para el producto").bail(),
    
    check("price")
        .notEmpty().withMessage("Debe ingresar un precio").bail()
        .isNumeric().withMessage("Sólo puede ingresar datos numéricos").bail()
        .custom(element => element >= 0).withMessage("Debe ingresar un número mayor ó igual a 0"),

    check("discount")
        .notEmpty().withMessage("Debe ingresar un porcentaje de descuento").bail()
        .isNumeric().withMessage("Sólo puede ingresar datos numéricos").bail()
        .custom(element => element >= 0 && element <= 100)
        .withMessage("Sólo se admiten porcentajes (entre 0 y 100)"),
    
    check("category")
        .notEmpty().withMessage("Debe seleccionar una categoría"),

    // Sanitizadores
    body("price")
        .toFloat(),
    body("discount")
        .toInt(),
]