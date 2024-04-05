const { Country } = require('../db')

module.exports = async () => {
    try {
        const countries = await Country.findAll({
            attributes: ['id', 'name']
        });

        if (!countries) {
            return { status: false, message: "Error fetching countries"}
        }

        return countries
    } catch (error) {
        console.log(error)
        return error
    }
}