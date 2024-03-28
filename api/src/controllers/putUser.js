const { User } = require('../db')

module.exports = async (id, body) => {
    try {
        const data = {}
        const user = await User.findOne({where : {id}})
        if(user){
            for(let key in body){
                if(key!==  "auth") user[key] = body[key] ? body[key] : user[key]
            }
            await user.save();
            return {status:true,user};
        }
        return {status:false,message:'No existe pelicula con ese Id'} 
    } catch (error) {
        return {status:false,error} 
    }
}