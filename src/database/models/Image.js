/**
 * Modelo de ORM asociado a la tabla "images" en la base de datos. 
 */

module.exports = (sequelize, dataTypes) => {

    let alias = "Images";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        product_id:{
            type: dataTypes.INTEGER.UNSIGNED
        }
    };

    let config = {
        tableName : "images",
        timestamps : false
    }

    const Image = sequelize.define(alias, cols, config);
    return Image;
}