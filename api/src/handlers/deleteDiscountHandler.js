const deleteDiscount = require('../controllers/deleteDiscount')

module.exports = async (req, res) => {
    try {
        const {id} = req.params
        const data = await deleteDiscount(id)

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json(error)
    }
}