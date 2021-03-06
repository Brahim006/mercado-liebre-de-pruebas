const multer = require("multer");
const path = require("path");

/**
 * Construye un motor de subida de archivos para multer que se encarga de almacenarlos en
 * disco según la carpeta especificada.
 * @param {string} folder El nombre de la carpeta (dentro del directorio "/public/images") en
 *                        la que se desean guardar las imágenes. Multer NO CREA las carpetas,
 *                        por lo que dicha carpeta debe existir previamente.
 * @param {Array} allowedMIMETypes Un arreglo de strings conteniendo los tipos MIME que sean soportados.
 */
module.exports = function(folder, allowedMIMETypes){
    return {
        storage : multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.join(__dirname, "..", "..", "public", "images", folder));
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + file.originalname.slice(0,3) + "-" + Date.now() + 
                    path.extname(file.originalname));
            }
        }),

        fileFilter : function(req, file, cb){
            if(allowedMIMETypes.includes(file.mimetype)){
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    }
     
}

