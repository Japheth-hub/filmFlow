const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('movie', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        trailer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        movie: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        director: {
            //Provisional
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        duration: {
            //Provisional
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('approved', 'pending', 'declined'),
            allowNull: false,
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        revenue:{
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {paranoid : true})
}