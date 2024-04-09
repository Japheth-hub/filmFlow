const putProducer = require('../controllers/putProducer')

module.exports = async (req, res) => {
    try {
        const body = req.body

        if (Object.keys(body).length === 0) {
            return res.status(422).json({ message: 'No hay datos para actualizar' });
        }

        const data = await putProducer(body);

        if (!data.status) {
            return res.status(422).json(data);
        }
        
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}