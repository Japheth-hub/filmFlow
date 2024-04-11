const { User } = require("../db");

module.exports = async (id) => {
    try {
        const data = {};
        await User.restore({ where: { id } });

        return (data.message = "Pelicula Habilitada");
    } catch (error) {
        return error;
    }
};
