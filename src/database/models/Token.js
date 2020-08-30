/**
 * Modelo de ORM asociado a la tabla "tokens" en la base de datos.
 */

module.exports = (sequelize, dataTypes) =>{

    let alias = "Tokens";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER.UNSIGNED
        },
        token: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    let config = {
        tableName: "tokens",
        timestamp: false
    }

    const Token = sequelize.define(alias, cols,config);
    return Token;
}