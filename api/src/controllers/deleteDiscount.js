const { Discount } = require("../db");

module.exports = async (id) => {
    try {

        const rows = await Discount.destroy({where : {id : id}})
        if(rows > 0){
            return {message: "Descuento eliminado"}
        } else {
            return {message: "No se pudo eliminar tu descuento"}
        }
        
    } catch (error) {
        console.log('Error en deleteDiscount', error)
        return error
    }
}