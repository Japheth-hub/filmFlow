const {Reviews, User, Movie} = require('../db')

module.exports = async () => {
    try {
        const error = {}
        const reviews = await Reviews.findAll({
            // include: [
            //     { model: User },
            //     { model: Movie }
            // ]
        })
        if(reviews.length === 0){
            return error.message = 'No hay reviews'
        }
        return reviews
    } catch (error) {
        return error
    }
}