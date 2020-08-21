/**
 * Trimmea todos los campos ingresados de modo que se eliminen los espacios ingresados en los imputs.
 */

module.exports = function(req, res, next){
    req.body.name = req.body.name.trim();
    req.body.price = req.body.price.trim();
    req.body.discount = req.body.discount.trim();
    req.body.description = req.body.description.trim();
    next();
}