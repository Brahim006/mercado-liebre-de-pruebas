'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        /**
         * Asociación a la tabla de "images", con la cual tiene una relación 1:N
         */
        static associate(models) {
            this.hasMany(models.image);
        }
    };
    product.init({
        name: DataTypes.STRING(100),
        description: DataTypes.STRING,
        price: DataTypes.INTEGER,
        discount: DataTypes.TINYINT,
        category: DataTypes.STRING(100)
    }, {
        sequelize,
        modelName: 'product'
    });
    return product;
};