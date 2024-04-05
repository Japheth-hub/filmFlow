const getCountries = require("../controllers/getCountries")

module.exports = async (req, res) => {
    try {
        const data = await getCountries();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}