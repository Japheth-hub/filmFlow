const { Movie, Cart } = require('../db');
const createCart = require('../services/createCart');

module.exports = async (req) => {
    try {
        const data = {}
        const body = req.body;
        const user = req.user;
        const userId = user.id;
        let status = false;

        const { movieId, movies } = body;
        
        if(movieId) {
            const movie = await Movie.findByPk(movieId)
            if (!movie) {
                return data.message = 'Error encontrando peliculas con ese Id'
            }

            if (!data.message) {
                const cart = await Cart.create({
                    movieId,
                    userId,
                });
                status = true;
                if (!cart) {
                    return data.message = 'Error al añadir la pelicula al carrito'
                }
            }
        }

        if(movies) {
            for (const movie of movies) {
                const cart = await Cart.create({
                    movieId: movie.id,
                    userId,
                });
                status = true;
                if (!cart) {
                    return data.message = 'Error al añadir la pelicula al carrito'
                }
            }
        }

        const cartFinal = await createCart(user);
        data.movies = cartFinal;

        return {message:data.message,movies:cartFinal}
    } catch (error) {
        return error
    }
}

