const purchases = require('../utils/purchases');
const { Purchase } = require('../db');

module.exports = async()=>{
    let count = 0
    for (purchase of purchases) {
        const {userId,movieId,amount} =  purchase;
        const [newGenre, created] = await Purchase.findOrCreate({
            where: { userId,movieId,amount },
        });

        if (created) {
        count++
        }
    }
    console.log(`Successfully created ${count} purchases`);
}