/**
 * Middleware que se encarga de comprobar que el usuario esté loggeado.
 * En caso de que lo esté, inserta la variable "user" de la sesión en
 * las variables locales del request bajo en nombre de "authUser".
 */
const dataModel = require("../utils/dataModel");
const usersModel = dataModel("users");
const usersTokensModel = dataModel("tokens");

module.exports = function(req, res, next){
    if(req.session.user){
        // El nombre es "authUser" para evitar conflictos con la variable "user"
        // que se usó en las vistas
        res.locals.authUser = req.session.user
    } else if (req.cookies.userToken){
        // Verifico si existe el token
        let token = usersTokensModel.getByField("token", req.cookies.userToken);

        if(token){
            let user = usersModel.getByField("id", token.userID);
            delete user.password;

            if(user){
                req.session.user = user;
                res.locals.authUser = user;
            }
        }
        
    }
    next();
}