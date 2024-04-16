const {Discount, Movie, Genre} = require('../db')

module.exports = async (req,res)=>{
    try {
        const disCodes = await Discount.findAll({
            include: [
                {model: Movie},
                {model: Genre}
            ],
            order: [['id', 'DESC']]
        });
        disCodes.length > 0 ? res.status(200).json(disCodes) : res.status(404).json({message: "No hay descuentos"})
    } catch (error) {
        res.status(500).json(error)
    }    
}