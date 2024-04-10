const deleteReview = require('../controllers/deleteReview')

module.exports = async (req, res) => {
    try {
        const {id} = req.params
        const data = await deleteReview(id)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}