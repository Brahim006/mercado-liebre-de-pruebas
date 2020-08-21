const path = require("path");
const fs = require("fs");

const dataFilePath = path.join(__dirname, "..", "data");

/**
 * Retorna una instancia de un DAO para poder operar sobre una tabla específica.
 * @param {string} tableName El nombre de la tabla sobre la que se desea operar.
 * @returns {object} Un DAO con métodos de acceso a datos para poder realizar 
 *                   operaciones de ABM (alta, baja, modificación).
 */
module.exports = function(tableName){
    return {

        filePath: path.join(dataFilePath, tableName + ".json"),
        imagesPath: path.join(__dirname, "..", "..", "public", "images", tableName),
    
        /** DE USO INTERNO, lectura de la base de datos */
        readDB: function(){
            return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
        },
    
        /** DE USO INTERNO, escritura de la base de datos */
        writeDB: function(content){
            fs.writeFileSync(this.filePath, JSON.stringify(content, null, 4));
        },
    
        /**
         * Borra una imagen (o una colección de imágenes) de la carpeta que se ha designado
         * en disco para su almacenamiento.
         * @param {...string} images String ó array de strings con los nombres de las imágenes
         *                           a borrar.
         */
        deleteImages: function(images){
            if(Array.isArray(images)){
                images.forEach(image => {
                    fs.unlinkSync(path.join(this.imagesPath, image));
                });
            } else {
                fs.unlinkSync(path.join(this.imagesPath, images));
            }
        },

        /** Retorna un ID válido para el producto - de uso interno */
        getValidIndex(){
            let id = 1;
            let data = this.readDB();
    
            for(let i = 0; i < data.length; i++){
                if(data[i].id == id){
                    id++;
                } else 
                    break;
            }
    
            if(id == data.length) id++;
    
            return id;
        },
    
        /**
         * Retorna todos los productos desde la base de datos.
         * @returns {Array} Un arreglo con objetos que representan todos los registros en BD.
         */
        all: function(){
            return this.readDB();
        },
    
        /**
         * Busca en la BD la primera coincidencia según un campo con un valor específico.
         * @param {string} field El campo sobre el que se quiere realizar la consulta.
         * @param {*} value El valor sobre el que se quiere igualar al campo.
         * @return {object} Un objeto que encapsula las propiedades del objeto buscado ó
         *                  null en caso de que no hayan coincidencias.
         */
        getByField: function(field, value){
            let data = this.readDB();
            let row = data.find(element => {
                return element[field] == value;
            });
    
            return row ? row : null;
        },
    
        /**
         * Busca laBDtodalas coincidecias que cumplaco el criterio de búsqueda.
         * @param {string} field El campo sobre el que se quiere evaluar la búsqueda.
         * @param {*} value El valor deseado que deben tener los objetos debúsqueda.
         * @returns {Array} Un array conteniendo todos los objetos que cumplan con el
         *                  criterio de búsqueda ó null en caso de que no haya coincidencias.
         */
        getAllByField: function(field, value){
            let data = this.readDB();
            let rows = data.filter(element => {
                return element[field] == value;
            });
    
            return rows.length > 0 ? rows : null;
        },
    
        /**
         * Almacena un registro en la base de datos.
         * @param {object} row Un objeto a almacenar en la base de datos, su ID es generado
         *                     auto máticamente, garantizando una clave primaria única.
         */
        store: function(row){
            // Introduce un index disponible
            row.id = this.getValidIndex();
    
            // Lo inserta en la "base de datos"
            let data = this.readDB();
            if(!data) data = [];
    
            data.push(row);
    
            this.writeDB(data);
        },
    
        /**
         * Actualiza un registro en la base de datos según un producto modificado.
         * @param {object} row Un objeto que contanga todas las características nuevas. 
         */
        update: function(row){
            // Se le asigna el ID del producto que va a reemplazar
            let id = row.id;
            let data = this.all();
            index = -1;
    
            // Determino el índice del producto con ese ID
            for(let i = 0; i < data.length; i++){
                if(data[i].id == id){
                    index = i;
                    break;
                }
            }
    
            // Reemplazo el producto
            if(index != -1){
                data.splice(index, 1, row);
            }
            // Actualización BD
            this.writeDB(data);
        },
    
        /**
         * Elimina un registro de la base de datos.
         * @param {number} id El ID del producto a eliminar.
         */
        delete: function(id){
            let data = this.all();
    
            data = data.filter(element => {
                return element.id != id;
            });
    
            this.writeDB(data);
        }
    }
}