const { Review, User, Movie } = require("../db");

module.exports = async (id) => {
    try {
        const row = await Review.destroy({where: {id : id}})
        if(row){
            return {message: 'Review eliminada con exito'}
        } else {
            return {message: 'No se puedo eliminar'}
        }
    } catch (error) {
        console.log(error)
        return error
    }
}