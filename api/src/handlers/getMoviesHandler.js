const getMovies = require('../controllers/getMovies');


module.exports = async function getMoviesHandler(req, res){
    try {
        const data = await getMovies(req.query)
        if(data.length){
            res.status(200).json(data)
        }else{
            res.status(404).json({message:"No hay películas"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}