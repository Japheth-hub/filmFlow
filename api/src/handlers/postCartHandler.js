const postCart = require("../controllers/postCart")

module.exports = async (req, res) => {
    try {

        const data = await postCart(req)

        if(data.message){
            return res.status(404).json(data.message)
        } 

        return res.status(200).json({message : 'Pelicula añadida al carrito con exito'})
    } catch (error) {
        return res.status(500).json(error)
    }
} 