const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("genre", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emoji: {
      type: DataTypes.STRING,
      allowNull: true,
      binary: true // Importante para emojis
    }
  });
};

