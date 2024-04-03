const { Purchase,Movie } = require('../db');

module.exports = async function getPurchases(query){
    let options = {};
    const {limit,user} = query;
    if(limit){
        options = {
            ...options,
            limit
        }
    }

    if(user){
        include: [
            {
              model: Movie,
              where: { userId: user.id }
            }
          ]
    }
    const purchases = await Purchase.findAll({...options});

    return purchases;
}