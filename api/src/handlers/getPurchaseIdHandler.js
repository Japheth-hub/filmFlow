const getPurchaseId = require('../controllers/getPurchaseId')

module.exports = async (req, res) => {
    try {
        const data = await getPurchaseId(req)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}