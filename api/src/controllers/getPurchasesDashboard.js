const { Purchase,Movie,PurchaseMovie, User } = require('../db');
const { Op } = require('sequelize');

module.exports = async function getPurchases(req){
    try {
        const {limit,user,month} = req.query;
        
        let options = {};
        
        if(limit){    
            options = {
                ...options,
                limit
            }
        }

        // if(user){
            options.include =  [
                {
                model: Movie,
                // where: { userId: user },
                // through: {
                //     model: PurchaseMovie,
                // //     attributes: ['price'], 
                // },
                model: User
                }
            ]
        // }

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

        return { status: true, purchases: purchases}
    } catch (error) {
        console.error(error)
        return { status: false, message: "Error:", error}
    }
}