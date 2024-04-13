const {Movie,Purchase,Review} = require('../db');
module.exports = async(userId,movieId)=>{
    const purchase = await Purchase.findOne({where:{userId},include:{
        model:Movie,
        where:{id:movieId}
    }}) 
    const review = await Review.findOne({where:{userId,movieId}});
    console.log("hola",purchase);
    if(purchase && !review){
        console.log("retorna true");
        return true
    }else{
        return false;
    }
}