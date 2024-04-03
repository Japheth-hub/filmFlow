const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("purchase", {
    stripeId: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    method: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false
    }
  });
};
