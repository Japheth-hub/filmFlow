const { Purchase,User } = require('../db');



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
        if(!options.where){
            options.where = {};
        }
        options.where.userId = user;
    }
    const purchases = await Purchase.findAll({...options})
}