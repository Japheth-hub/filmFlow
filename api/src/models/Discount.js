const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('discount', {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        percentage:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        used:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        allowedUses:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        starts:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        ends:{
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {paranoid : true})
}