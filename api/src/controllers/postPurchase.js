const { Purchase, Cart, User } = require('../db');
const { Op } = require('sequelize');

module.exports = async (purchaseInfo) => {
    try {
        const {sid,amount} = purchaseInfo;
        const user = User.findOne({where:{sid}});

        const cart = await Cart.findAll({
            where: {
                userId: user.id
            }
        })

        if (cart && cart.length > 0) {
            const purchase = await Purchase.create({
                userId: user.id,
                amount
             });
            const movieIds = cart.map(item => item.movieId);

            const movies = await Movie.findAll({
                where: {
                  id: {
                    [Op.in]: movieIds,
                  },
                },
            });

            purchase.setMovies(movies);

            const rows = await Cart.destroy({
                where: {
                    userId: userId
                }
            })

            if (!rows) {
                console.log("error eliminando las peliculas del carrito")
            }
        }
        
        console.log("peliculas compradas con exito")
   
    } catch (error) {
        return error
    }
}

