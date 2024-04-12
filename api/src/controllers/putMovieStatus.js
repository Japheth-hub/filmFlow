const { Movie } = require('../db');

module.exports = async (body, id) => {
    try {
        //Esta esperando recibir los siguientes parametros por body de la siguiente manera:
        //{
        //     "auth": "(sid del admin actual)",
        //     "id": "(id de la pelicula)",
        //     "status": "(status al que cambiar la pelicula: 'approved', 'pending', 'declined')"
        //}
        const { status } = body;

        const movie = await Movie.findByPk(id)
        console.log(movie)

        if (movie.status === status) {
            return { status: false, message: `La pelicula ya tiene ese estado`}
        }

        movie.status = status

        await movie.save();

        return { status: true, message: `Estado de la pelicula cambiado exitosamente` };
    } catch (error) {
        console.error(error);
        return { status: false, message: 'Error en el servidor', error };
    }
};