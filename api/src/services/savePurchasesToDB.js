const purchases = require('../utils/purchases');
const { Purchase,Movie } = require('../db');
const { Op } = require('sequelize');

module.exports = async()=>{
    let count = 0
    for (purchase of purchases) {
        const {userId,movieId,amount,stripeId,method,currency,status} =  purchase;
        const [newPurchase, created] = await Purchase.findOrCreate({
            where: { amount,currency,status,stripeId, method,currency,userId},
        });

        const moviesDB = await Movie.findAll({
            where: {
                id: {
                [Op.in]: movieId,
                },
            },
        });

        newPurchase.setMovies(moviesDB);

        if (created) {
            count++
        }
    }
    console.log(`Successfully created ${count} purchases`);
}