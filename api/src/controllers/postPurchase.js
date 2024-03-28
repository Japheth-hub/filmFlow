const { Purchase, Cart } = require('../db');
const getCart = require('./getCart');

module.exports = async (req) => {
    try {
        const user = req.user
        const userId = user.id

        const cart = await Cart.findAll({
            where: {
                userId: userId
            }
        })

        if (cart && cart.length > 0) {
            const movieIds = cart.map(item => item.movieId);

            for (const movieId of movieIds) {
                const [purchase, created] = await Purchase.findOrCreate({
                    where: {
                        movieId: movieId,
                        userId: userId
                    }
                });
                if (!created) {
                    return { status: false, message: `Ya compro la pelicula con el id ${movieId}` };
                }
            }
            const rows = await Cart.destroy({
                where: {
                    userId: userId
                }
            })
            if (!rows) {
                return { status: false, message: `Error eliminando las peliculas del carrito` };
            }
        }
        
        return { status: true, message: 'Peliculas compradas con exito'}
    } catch (error) {
        return error
    }
}

