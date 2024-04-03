const { Purchase, Cart, User,Movie } = require('../db');
const { Op } = require('sequelize');

module.exports = async (purchaseInfo) => {
    try {
        let {sid,amount,movies} = purchaseInfo;
        const user = await User.findOne({where:{sid}});

        movies = movies.split(",");

        const purchase = await Purchase.create({
            userId: user.id,
            amount
         });
           

        const moviesDB = await Movie.findAll({
            where: {
                id: {
                [Op.in]: movies,
                },
            },
        });

        purchase.setMovies(moviesDB);

        const rows = await Cart.destroy({
            where: {
                userId: user.id
            }
        })

        if (!rows) {
            console.log("error eliminando las peliculas del carrito")
        }
        
        
        console.log("peliculas compradas con exito")
   
    } catch (error) {
        console.log(error);
        return error
    }
}

