/**
 * Middleware para controlar las rutas de "huespedes", es decir, envía al login cada vez que un
 * usuario que no se haya autenticado intente ingresar a una ruta para la que se necesite estarlo.
 */

module.exports = function(req, res, next){
    if(req.session.user){ // Checkea si el usuario está logueado
        res.redirect("/");
    } else {
        next();
    }
}