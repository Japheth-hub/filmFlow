const getPurchases = require('../controllers/getPurchases')

module.exports = async (req, res) => {
    try {
        const data = await getPurchases(req)

        if(!data.status) {
            return res.status(422).json(data.message)
        }

        return res.status(200).json(data.purchases)
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
}