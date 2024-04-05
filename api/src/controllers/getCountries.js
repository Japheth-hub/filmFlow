const { Country } = require('../db')

module.exports = async () => {
    try {
        const countries = await Country.findAll({
            attributes: ['id', 'name']
        });
        
        if (!countries) {
            return { status: false, message: "Error fetching countries"}
        }

        return { status: true, countries}
    } catch (error) {
        console.log(error)
        return { status: false, message: error}
    }    
}