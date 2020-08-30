/**
 * Modelo de ORM asociado a la tabla "profiles" en la base de datos. 
 */

module.exports = (sequelize, dataTypes) => {
    
    let alias = "Profiles";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }

    let config = {
        tableName: "profiles",
        timestamps: false
    }

    const Profile = sequelize.define(alias, cols, config);
    return Profile;
}