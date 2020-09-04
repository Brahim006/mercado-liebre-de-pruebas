'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Asociación a la tabla "profiles", con la cual tiene una relación N:1
         * y a la tabla "tokens" con la cual tiene una relación 1:N
         */
        static associate(models) {
            this.belongsTo(models.profile);
            this.hasMany(models.token);
        }
    };
    User.init({
        name: DataTypes.STRING(100),
        lastName: {
            type: DataTypes.STRING(100),
            field: "last_name"
        },
        userName: {
            type: DataTypes.STRING(20),
            field: "user_name"
        },
        email: DataTypes.STRING(254),
        birth: DataTypes.DATE,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        profileId: {
            type: DataTypes.INTEGER,
            field: "profile_id"
        }
    }, {
        sequelize,
        modelName: 'user',
        timestamps: false
    });
    return User;
};