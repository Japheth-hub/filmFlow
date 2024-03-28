const { Movie, Cart } = require('../db')

module.exports = async (req) => {
    try {
        const data = {}
        const body = req.body;
        const user = req.user;
        const userId = user.id;

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
                })
                if (!cart) {
                    return data.message = 'Error al añadir la pelicula al carrito'
                }
            }
        }
        return data
    } catch (error) {
        return error
    }
}

