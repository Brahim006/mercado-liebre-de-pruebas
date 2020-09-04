'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class profile extends Model {
        /**
         * Asociación a la tabla de "users", con la cual tiene una relación 1:N
         */
        static associate(models) {
            this.hasMany(models.user);
        }
    };
    profile.init({
        name: DataTypes.STRING(100)
    }, {
        sequelize,
        modelName: 'profile',
        timestamps: false
    });
    return profile;
};