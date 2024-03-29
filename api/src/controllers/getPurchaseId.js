const { User, Movie } = require("../db");

module.exports = async (req) => {
    try {
        const user = req.user
        const userId = user.id
        const usuario = await User.findByPk(userId,{
            include: [{ model: Movie }],
        });
        if(usuario && usuario.movies.length > 0){
            const peliculas = []
            for(let movie of usuario.movies){
                const pelicula = await Movie.findByPk(movie.id, {
                    attributes: ['id', 'name', 'poster']
                })
                peliculas.push(pelicula)
            }
            return peliculas
        } else {
            return 'Este usuario aun no tiene compras'
        }
        
    } catch (error) {
        return error
    }
}
