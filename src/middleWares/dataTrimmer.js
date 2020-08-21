/**
 * Retorna un callback de control de ingreso de texto que se encarga de trimmear (eliminar)
 * @param  {...string} args 
 */
module.exports = function(...args){
    return function(req, res, next){
        args.forEach(arg =>{
            req.body[arg] = req.body[arg].trim();
        });
        next();
    }
}