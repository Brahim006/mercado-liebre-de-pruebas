const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const dataModel = require("../utils/dataModel");
const usersModel = dataModel("users");

const HASH_SALT = 10;

module.exports = {
    
    register : function(req, res){
        res.render("users/register");
    },

    login : function(req, res){
        res.render("users/login");
    },

    store: function(req, res){
        
        let errors = validationResult(req);
        if(errors.isEmpty()){

            let user = req.body;
            delete user.confirmPassword; // Borra la password duplicada

            // Hasheo la contraseña
            user.password = bcrypt.hashSync(user.password, HASH_SALT);

            usersModel.store(user);

        } else {
            res.render("users/register", {
                errors : errors.mapped(),
                user : req.body
            })
        }

    },

    processLogin : function(req, res){
        // TODO: logear usuarios
    }

}