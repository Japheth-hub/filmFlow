const {Discount} = require('../db')

module.exports = async (req,res)=>{
    try {
        const disCodes = await Discount.findAll()

        res.status(200).json(disCodes)
    } catch (error) {
        res.status(500).json(error)
    }    
}