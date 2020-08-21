/**
 * Retorna un callback que puede ser usado como middleware de control de ingreso de texto que se encarga 
 * de trimmear (eliminar) los espacios insertados antes y después de cada input de un formulario.
 * @param  {...string} args Los nombres de los campos del formulario cuyos datos se quieran trimmear.
 */
module.exports = function(...args){
    return function(req, res, next){
        args.forEach(arg =>{
            req.body[arg] = req.body[arg].trim();
        });
        next();
    }
}