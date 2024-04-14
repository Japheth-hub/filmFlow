const { Country,Movie } = require('../db')

module.exports = async (req) => {
    try {
        const {existent} = req.query;
        let options = {};

        if (existent) {
            options = {
                ...options,
                include: {
                    model: Movie,
                    attributes: ["id","name"],
                    required: true,
                }
            };
        }

        const countries = await Country.findAll({
            ...options,
            attributes: ['id', 'name', 'flag']
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