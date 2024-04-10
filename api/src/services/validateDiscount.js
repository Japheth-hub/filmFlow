const {Discount,Movie} = require('../db');
module.exports = async (id)=>{
    try {
        
        const currentDate  = new Date();
        const discount = await Discount.findOne({
            where:{id},
            include:{
                model:Movie,
            }
        });
    
    
        if(!discount){
            return {status:false,message:"El descuento no existe"};
        }
        
        if(discount.starts < currentDate){
            return {status:false,message:"El descuento aún no es válido"};
        }
    
        if(discount.ends < currentDate){
            return {status:false,message:"El descuento ya no es válido"};
        }
    
        if(discount.used && discount.used >= discount.allowedUses){
            return {status:false,message:"Ya ha superado la cantidad de usos permitido"}; 
        }
         
        return {status:true,discount}
    } catch (error) {
        console.log(error);
    }
}