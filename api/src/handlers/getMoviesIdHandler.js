const getMoviesId = require('../controllers/getMoviesId')

module.exports = async (req, res)=>{
    try {
        const {id} = req.params
        const data = await getMoviesId(id)
        if(data.message){
            console.log(data)
            res.status(404).json(data)
            return
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}