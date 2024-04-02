const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("purchase", {
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false
    }
  });
};
