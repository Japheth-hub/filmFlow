const { User,Role } = require('../db');
const getPurchases = require('../controllers/getPurchases')
const postReport = require('../controllers/postReport')

module.exports.dailyJob = async()=>{
    console.log("ejecutando Cron Job Reporte diario de Productor");
    try {
        const users = await User.findAll({
            include:{
                model:Role,
                where:{
                    role:'producer'
                }
            }
        })
        
        if(users){
            users.map(async(user)=>{
                const purchases = await getPurchases({user:user.id,month:true});
                
                const purchaseTotalEnd = purchases.reduce((purchaseTotal, innerPurchase) => {
                    const moviesTotal = innerPurchase.movies.reduce((moviesTotal, movie) => {
                        return moviesTotal + movie.movie_purchase.price;
                    }, 0);
                    return purchaseTotal + moviesTotal; 
                }, 0);
                
              const report = await postReport('producerMonthReport',purchaseTotalEnd,user);
            }) 
        }
    } catch (error) {
        console.log(error);
    }
    
}