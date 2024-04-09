const { Purchase,Movie,PurchaseMovie } = require('../db');
const { Op } = require('sequelize');

module.exports = async function getPurchases(query){
    let options = {};
    const {limit,user,month} = query;
    if(limit){
        options = {
            ...options,
            limit
        }
    }

    if(user){
        options.include =  [
            {
              model: Movie,
              where: { userId: user },
              through: {
                model: PurchaseMovie,
                attributes: ['price'], // Solo seleccionamos el precio pagado
              },
            }
          ]
    }

    if(month){
        const endDate = new Date();
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
        options.where =  {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        }
    }

    const purchases = await Purchase.findAll({...options});



    return purchases;
}