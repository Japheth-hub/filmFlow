const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("report", {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false
  },
    result: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false  
    }
  },{timestamps: true});
};

