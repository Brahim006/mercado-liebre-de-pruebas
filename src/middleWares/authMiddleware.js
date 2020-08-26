/**
 * Middleware que se encarga de comprobar que el usuario esté loggeado.
 * En caso de que lo esté, inserta la variable "user" de la sesión en
 * las variables locales del request bajo en nombre de "authUser".
 */

module.exports = function(req, res, next){
    if(req.session.user){
        // El nombre es "authUser" para evitar conflictos con la variable "user"
        // que se usó en las vistas
        res.locals.authUser = req.session.user
    }
    next();
}