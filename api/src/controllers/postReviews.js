const {Review, User, Movie} = require('../db')

module.exports = async (userSid, movieId, comment, points) => {
    try {
        const error = {}
        const user = await User.findOne({
                where:{
                    sid: userSid
                }
        })
        
        const movie = await Movie.findByPk(movieId)
        if(!user){
            error.message = 'No existe este usuario'
            return error
        }
        if(!movie){
            error.message = 'No existe pelicula con ese id'
            return error
        } 

        const review = await Review.create(
            {
            userId: user.id,
            movieId : movie.id,
            comment,
            points
        })
        if(!review){
            error.message = 'No se creo la review'
            return error
        }

        return review
    } catch (error) {
        return error
    }
}
