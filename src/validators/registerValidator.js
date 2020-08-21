/**
 * Validador para el formulario de registro.
 */
const { check, body } = require("express-validator");

module.exports = [
    check("name")
        .notEmpty().withMessage("Debes ingresar un nombre").bail()
        .isLength({max : 50}).withMessage("Nombre demasiado largo"),

    check("lastName")
        .notEmpty().withMessage("Debes ingresar tu apellido").bail()
        .isLength({max : 50}).withMessage("Apellido demasiado largo"),

    check("userName")
        .notEmpty().withMessage("Debe ingresar un nombre de usuario").bail()
        .isLength({min : 8}).withMessage("Debe tener 8 caracteres como mínimo").bail()
        .isAlphanumeric("es-ES").withMessage("Sólo se admiten números y símbolos del español"),

    check("email")
        // TODO: Checkear que el mail no esté en uso!
        .notEmpty().withMessage("Debe ingresar un email de referencia").bail()
        .isEmail().withMessage("Debe ingresar un email válido").bail(),
    
    check("birth")
        // TODO: Encontrar una forma de comprobar si el usuario es mayor de edad...
        .notEmpty().withMessage("Debe ingresar una fecha").bail()
        .isDate().withMessage("Debe ingresar una fecha válida"),

    check("address")
        .notEmpty().withMessage("Debe ingresar una dirección").bail()
        .isLength({max : 255}).withMessage("Sólo se admiten hasta 255 caracteres"),

    check("password")
        // TODO: Validar que la contraseña tenga al menos una minúscula, una mayúscula y un número
        .notEmpty().withMessage("Debe ingresar una contraseña").bail()
        .isLength({min: 8, max : 12})
            .withMessage("Debe contener como mínimmo 8 caracteres y como máximo 12").bail(),

    check("confirmPassword")
        .notEmpty().withMessage("Debe reingresar su contraseña").bail()
        .custom(value => {
            return value == body("password");
        }).withMessage("Ambas contraseñas deben coincidir")
        
]