'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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
        modelName: 'image',
        timestamps: false
    });
    return image;
};