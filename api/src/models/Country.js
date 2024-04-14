const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('country', {
        id: {
            type: DataTypes.STRING(2),
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flag: {
            type: DataTypes.STRING,
            allowNull: false,
            binary: true
        },
    },
    {paranoid : true})
}