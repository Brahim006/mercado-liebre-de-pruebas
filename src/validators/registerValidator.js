/**
 * Validador para el formulario de registro.
 */
const dataModel = require("../utils/dataModel");
const usersModel = dataModel("users");
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
        .custom(value => { // Comprueba que el nombre de usuario no esté en uso
            return usersModel.getByField("userName", value) == null;
        }).withMessage("El nombre de usuario ya está en uso"),

    check("email")
        .notEmpty().withMessage("Debe ingresar un email de referencia").bail()
        .isEmail().withMessage("Debe ingresar un email válido").bail()
        .custom(value => { // Comprueba que el mail esté disponible
            return usersModel.getByField("email", value) == null;
        }).withMessage("Este email ya se encuentra registrado"),
    
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
        .withMessage("Debe contener como mínimmo 8 caracteres y como máximo 12").bail()
        .custom(value => {
            // Condiciones
            let hasUpper = false, hasLower = false, hasNumber = false;

            // Todas las comprobaciones de caracteres se hacen sobre el código ASCII
            // https://elcodigoascii.com.ar/
            for(let i = 0; i < value.length; i++){
                let code = value.charCodeAt(i); // Retorna el código ASCII del caracter

                // Checkea minúsculas                                 ñ
                if(!hasLower && (code >= 97 && code <= 122 || code == 164)) 
                    hasLower = true;
                // Checkea mayúsculas                                Ñ
                if(!hasUpper && (code >= 65 && code <= 90 || code == 165)) 
                    hasUpper = true;
                // Checkea números
                if(!hasNumber && parseInt(value.charAt(i)) != NaN) 
                    hasNumber = true;
            }

            return hasUpper && hasLower && hasNumber;
        }).withMessage("La contraseña debe contener por lo menos una mayúscula, una minúscula y un número")
        ,

    check("confirmPassword")
        .notEmpty().withMessage("Debe reingresar su contraseña").bail()
        .custom(value => {
            // TODO: Ver como implementar la comparación de contraseñas
            return body("password").equals(value);
        }).withMessage("Ambas contraseñas deben coincidir"),

    // Sanitizers
    body("userProfile")
        .toInt(), // Convierte a valor numérico

    body("interests")
        .toArray() // Convierte el campo en array
        // Convierte ó intenta convertir a valor numérico el ID de intereses
        .customSanitizer(value => {
            if(value.length != 0){
                // Si no está vacío, convierte en entero a cada selección
                return value.map(element =>{
                    return parseInt(element);
                });
            }
        })
        
]