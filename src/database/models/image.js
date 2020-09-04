'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class image extends Model {
        /**
         * Asociación a la tabla "products", con la cual tiene una relación N:1
         */
        static associate(models) {
            this.belongsTo(models.product);
        }
    };
    image.init({
        name: DataTypes.STRING,
        productId: {
            type: DataTypes.INTEGER,
            field: "product_id"
        }
    }, {
        sequelize,
        modelName: 'image'
    });
    return image;
};