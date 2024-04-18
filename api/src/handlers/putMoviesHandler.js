const putMovies = require('../controllers/putMovies')

module.exports = async (req, res) => {
    try {
        const {id} = req.params
        const body = req.body

        if(Object.keys(body).length === 0){
            res.status(400).json({message: 'No hay datos para actualizar'})
            return
        }

        const data = await putMovies(id, body)
        console.log(data);
        if(data.message){
            res.status(404).json(data)
            return 
        }
        res.status(200).json(data)

    } catch (error) {
        res.status(500).json(error)
    }
}