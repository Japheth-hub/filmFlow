const deleteCart = require('../controllers/deleteCart')

module.exports = async (req, res) => {
    try {
        const data = await deleteCart(req)

        if(data.message){
            return res.status(404).json(data)
        }

        return res.status(200).json(data)
    } catch (error) {
        console.log("Error del middleware:", error)
        return res.status(500).json(error)
    }
}