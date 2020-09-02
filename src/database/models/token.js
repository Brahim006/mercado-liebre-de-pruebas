'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class token extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    token.init({
        userId: {
            type: DataTypes.INTEGER,
            field: "user_id"
        },
        token: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'token',
        timestamps: false
    });
    return token;
};