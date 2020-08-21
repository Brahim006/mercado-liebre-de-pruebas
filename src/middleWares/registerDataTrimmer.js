/**
 * Middleware que trimmea todos los datos ingresados en campos de texto eliminando los espacios
 * del formulario de registro.
 */

module.exports = function(req, res, next){
    req.body.name = req.body.name.trim();
    req.body.lastName = req.body.lastName.trim();
    req.body.userName = req.body.userName.trim();
    req.body.email = req.body.email.trim();
    req.body.address = req.body.address.trim();
    req.body.password = req.body.password.trim();
    req.body.confirmPassword = req.body.confirmPassword.trim();
    next();
}