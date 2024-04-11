const getGenres = require('../controllers/getGenres')

module.exports = async (req, res) => {
    try {
        const data = await getGenres(req.query);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}