const getMovies = require('../controllers/getMovies');


module.exports = async function getMoviesHandler(req, res){
    try {
        const data = await getMovies(req.query)
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}