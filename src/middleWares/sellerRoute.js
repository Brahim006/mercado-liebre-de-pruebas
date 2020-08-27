/**
 * Middleware para controlael acceso a rutas qué sólo deban ser accedidas por usuarios
 * con el perfil de "vendedor"
 */

module.exports = function(req, res, next){
    if(req.session.user.userProfile == 1){
        next();
    } else {
        res.redirect("/products");
    }
}