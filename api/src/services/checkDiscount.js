
const calculateDiscount = require('../services/calculateDiscount');
const validateDiscount = require('../services/validateDiscount');
module.exports = async(req) =>{
    let {id,movies} = req.body;
    try {

        const data = await validateDiscount(id)
        
        if(data.status){
            movies = movies.map((movie)=>{
                if(data.discount.movies.find((item)=> item.id === movie.id)){
                    movie.price = calculateDiscount(movie.price,data.discount.percentage);
                }
                return movie;
            });
            return {status:true,movies};
        }else{
            console.log(discount);
            return {status:false,message:discount.message};
        }
    } catch (error) {
        console.log(error);
        return false
    }
}