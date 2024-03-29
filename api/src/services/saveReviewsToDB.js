const reviews = require('../utils/reviews')
const postReviews = require('../controllers/postReviews')


module.exports = async () => {
    try {
        let count = 0
        for(let review of reviews){
            const {userSid, movieId, comment, points} = review
            const creado = await postReviews(userSid, movieId, comment, points)
            creado ? count ++ : count
        }
        console.log(`Successfully created ${count} reviews`)
    } catch (error) {
        
    }
}