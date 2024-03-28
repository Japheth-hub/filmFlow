const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "review",
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      points : {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      movieId : {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      paranoid: true,
    }
  );
};
