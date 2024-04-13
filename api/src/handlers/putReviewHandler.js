const putReview = require('../controllers/putReview')

module.exports = async (req, res) => {
    try {
        const {id} = req.params
        const body = req.body
        const data = await putReview(id, body)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}