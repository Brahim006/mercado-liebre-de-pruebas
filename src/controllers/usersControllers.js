const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const dataModel = require("../utils/dataModel");
const usersModel = dataModel("users");
const usersTokensModel = dataModel("tokens");

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

            // Borro la password del usuario para evitar mandársela a la sesión
            delete user.password;
            // Almaceno el usuario en la sesión, para que aparezca logeado
            req.session.user = user;

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
                
                // Borro la password del usuario para evitar mandársela a la sesión
                delete user.password;
                // Almaceno el usuario en la sesión
                req.session.user = user;

                // VIDEO DE LANDO min 36:41

                // En caso de que el usuario haya marcado "recordarme", le envío una cookie
                if(req.body.remember){
                    // Genero un token seguro, aleatorio para la cookie del usuario
                    const token = crypto.randomBytes(48).toString("base64");

                    // Creo el token en la "BD" de toquens
                    usersTokensModel.store({userID : user.id, token : token});

                    // Almacena el Token en la cookie
                    res.cookie("userToken", token, {maxAge : 1000 * 60 * 60 * 24 * 30});
                }

                res.redirect("/");

            } else {
                // Creo un error y se lo envío a la vista
                res.render("users/login", {
                    errors : { athenticate : { msg : "Usuario ó contraseña incorrecta" } }
                });
            }

        } else {
            res.render("users/login", {errors : errors.mapped()});
        }

    },

    logout: function(req, res){
        // Borro todos los tokens de ese usuario en BD
        let tokens = usersTokensModel.getAllByField("userID", req.session.user.id);
        
        tokens.forEach(token => {
            usersTokensModel.delete(token.id);
        });

        // Destruyo la sesión
        req.session.destroy();
        // Limpio la cookie
        res.clearCookie("userToken");

        res.redirect("/");
    }

}