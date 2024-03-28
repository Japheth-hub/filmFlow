const getReviews = require('../controllers/getReviews')

module.exports = async (req, res) => {
    try {
        const data = await getReviews()
        
        if(data.message){
            res.status(404).json(data)
            return
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}