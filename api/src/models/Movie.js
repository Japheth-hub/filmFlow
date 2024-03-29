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
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            //Provisional
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('approved', 'pending', 'declined'),
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    },
    {paranoid : true})
}