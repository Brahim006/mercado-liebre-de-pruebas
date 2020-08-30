/**
 * Modelo de ORM asociado a la tabla "users" en la base de datos. 
 */

module.exports = (sequelize, dataTypes) => {
    
    let alias = "Users";

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
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }, 
        user_name: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(254),
            allowNull: false
        },
        birth: {
            type: dataTypes.DATE,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        address: {
            type: dataTypes.STRING,
            allowNull: false
        },
        profileId: {
            type: dataTypes.INTEGER.UNSIGNED,
            field: "profile_id",
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);
    return User;
}