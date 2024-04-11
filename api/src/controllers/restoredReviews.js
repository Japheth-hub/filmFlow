const { Review } = require("../db");

module.exports = async (id) => {
  try {
    const data = {};
    await Review.restore({ where: { id } });

    return (data.message = "Pelicula Habilitada");
  } catch (error) {
    return error;
  }
};
