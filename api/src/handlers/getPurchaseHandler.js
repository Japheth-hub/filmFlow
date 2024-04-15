const getPurchasesDashboard = require('../controllers/getPurchasesDashboard')

module.exports = async (req, res) => {
    try {
        const data = await getPurchasesDashboard(req)

        if(!data.status) {
            return res.status(422).json(data)
        }

        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
}