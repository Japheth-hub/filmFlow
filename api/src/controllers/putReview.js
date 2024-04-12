const { Review } = require("../db");

module.exports = async (id, body) => {
    try {
        const {points, comment} = body
        const review = await Review.findOne({where: {id}})
        if(review){
            const [rows, update] = await Review.update(
                { points, comment },
                { where: { id }, returning: true }
            );
            if (rows > 0) {
            return { message: "Review actualizada", update };
            }
            return { message: "No se actualizo" };
        } else {
            return {message: "Esta review no existe"}
        }
    } catch (error) {
        console.log('Error en la actualizacion', error)
    }
}
