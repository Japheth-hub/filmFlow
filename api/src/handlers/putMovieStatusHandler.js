const putMovieStatus = require('../controllers/putMovieStatus')

module.exports = async (req, res) => {
    try {
        const body = req.body
        const { id } = req.params

        if (Object.keys(body).length === 0) {
            return res.status(422).json({ message: 'No hay datos para actualizar' });
        }

        const data = await putMovieStatus(body, id);

        if (!data.status) {
            return res.status(422).json(data);
        }
        
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error en el servidor', error });
    }
}