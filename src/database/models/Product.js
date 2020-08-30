/**
 * Modelo de ORM asociado a la tabla "products" en la base de datos. 
 */

module.exports = (sequelize, dataTypes) => {

    let alias = "Products";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING,
            allowNull: true
        },
        price: {
            type: dataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        },
        discount: {
            type: dataTypes.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        category: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);
    return Product;
}