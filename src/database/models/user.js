'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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