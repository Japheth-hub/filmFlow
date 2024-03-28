const { User } = require('../db');

module.exports = async (id) => {
    try {
        const data = {}
        const rows = await User.destroy({where : {id}})
        if(rows){
            return {status:true,message:"El usuario fue borrado con éxito"}
        }
        return {status:false}
    } catch (error) {
        return error
    }
}