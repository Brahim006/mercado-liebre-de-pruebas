'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class token extends Model {
        /**
         * Asociación a la tabla "users", con la cual tiene una relación N:1
         */
        static associate(models) {
            this.belongsTo(models.user);
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