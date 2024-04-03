const getCountries = require("../controllers/getCountries")

module.exports = async (req, res) => {
    try {

        const data = await getCountries()

        if (data.status) {
            return res.status(200).json({
                countries: data.countries
            });
        } else {
            return res.status(204).json({ 
                message: data.message 
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error})
    }
}