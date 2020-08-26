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

        let user = req.body;

        if(errors.isEmpty()){
            // Hasheo la contraseña
            user.password = bcrypt.hashSync(user.password, HASH_SALT);
            delete user.confirmPassword; // Borra la password duplicada
            
            usersModel.store(user);
            res.redirect("/");
        } else {
            res.render("users/register", {
                errors : errors.mapped(),
                user : user
            })
        }

    },

    athenticate : function(req, res){
        const errors = validationResult(req);

        if(errors.isEmpty()){
            let user = usersModel.getByField("userName", req.body.userName);

            // Si el usuario existe y la contraseña coincide
            if(user && bcrypt.compareSync(req.body.password, user.password)){
                return res.json(user);
            } else {
                // Creo un error y se lo envío a la vista
                res.render("users/login", {
                    errors : { athenticate : { msg : "Usuario ó contraseña incorrecta" } }
                });
            }

        } else {
            res.render("users/login", {errors : errors.mapped()});
        }

    }

}