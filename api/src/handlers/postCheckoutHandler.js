const postCheckout = require('../controllers/postCheckout')

module.exports = async (req, res) => {
    try {    
        const body = req.body
        // console.log(body)
        if(!body){
            res.status(404).json('No hay productos')
            return 
        }
        const session = await postCheckout(body.list)
        res.status(200).json(session)
    } catch (error) {
        res.status(500).json(error)
    }
}