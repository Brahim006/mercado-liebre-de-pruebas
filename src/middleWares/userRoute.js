/**
 * Middleware para controlar las rutas a las que se supone que un usuario logueado no debería
 * porder accede (el login, por ejemplo), y los reenvía a la home.
 */

module.exports = function(req, res, next){
    if(req.session.user){ // Checkea si el usuario está logueado
        next();
    } else {
        res.redirect("/users/login");
    }
}