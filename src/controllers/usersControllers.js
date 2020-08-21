const fs = require("fs");
const path = require("path");

module.exports = {
    
    register : function(req, res){
        res.render("users/register");
    },

    login : function(req, res){
        res.render("users/login");
    },

    store: function(req, res){
        res.json(req.body);
    },

    processLogin : function(req, res){
        // TODO: logear usuarios
    }

}