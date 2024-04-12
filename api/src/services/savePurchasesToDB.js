const purchases = require('../utils/purchases');
const { Purchase, Movie, MoviePurchase } = require('../db');
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



        moviesDB.map(async (movie)=>{
            const newMoviePurchase = await MoviePurchase.create({
                purchaseId: newPurchase.id,
                movieId: movie.id,
                price: movie.price,
            });
       })


        if (created) {
            count++
        }
    }
    console.log(`Successfully created ${count} purchases`);
}