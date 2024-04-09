const {Review, User, Movie} = require('../db')

module.exports = async () => {
    try {
        const error = {}
        const data = await Review.findAll({
            include: [
                { model: User },
                { model: Movie }
            ]
        })
        if(data.length === 0){
            return error.message = 'No hay reviews'
        }

        const reviews = data.map((review) => {
            return {
                id: review.id,
                movie: review.movie.name,
                user: review.user.name,
                comment: review.comment,
                points: review.points,
                update: review.updatedAt
            }
        })

        return reviews
    } catch (error) {
        console.log(error)
        return error
    }
}