const { Cart, Movie } = require("../db");

module.exports = async (req) => {
  try {
    const user = req.user;
    const userId = user.id;

    const cart = await Cart.findAll({
      where: {
        userId: userId,
      },
    });

    if (cart && cart.length > 0) {
      const movies = [];
      const movieIds = cart.map((item) => item.movieId);

      for (const movieId of movieIds) {
        const movie = await Movie.findByPk(movieId, {
          attributes: ["id", "name", "poster"],
        });
        movies.push(movie);
      }

      movies.sid = user.sid;

      return { status: true, movies };
    }

    return {
      status: false,
      message: "Este usuario no tiene películas en su carrito",
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};
