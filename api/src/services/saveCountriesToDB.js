const countries = require('../utils/countries');
const { Country } = require('../db');

module.exports = async () => {
    let count = 0;
    let error = 0;
    for (let country of countries) {
        const countryNameLowerCase = country.name.toLowerCase(); 

        const [newCountry, created] = await Country.findOrCreate({
            where: {
                id: country.code,
                name: countryNameLowerCase, 
                flag: country.flag, 
            },
        });

        if (created) {
            count++;
        }
        if (!created) {
            error++;
        }
    }
    console.log(`Successfully created ${count} countries`);
    // console.log(`Error creating ${error} countries`);
};
