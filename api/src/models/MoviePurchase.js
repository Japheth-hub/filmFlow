const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("movie_purchase", {
    movieId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    purchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },{timestamps: false});
  return 
};

