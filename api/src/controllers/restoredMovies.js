const { Movie } = require("../db");

module.exports = async (id) => {
    try {
        const data = {};
        await Movie.restore({ where: { id } });
        
        return (data.message = "Pelicula Habilitada");
    } catch (error) {
        return error;
    }
};