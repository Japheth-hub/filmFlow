const postReviews = require('../controllers/postReviews')

module.exports = async (req, res) => {
    try {
        const {userId, movieId, comment, points} = req.body
        const data = await postReviews(userId, movieId, comment, points)
        if(data.message){
            res.status(404).json(data.message)
            return
        } 

        res.status(200).json({message : 'Tu comentario fue creado con exito'})
    } catch (error) {
        res.status(500).json(error)
    }
} 