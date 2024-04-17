const getProducerInfo = require("../controllers/getProducerInfo");

module.exports = async (req, res) => {
    try {
        const data = await getProducerInfo(req.params);

        if (!data.status) {
            return res.status(422).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Error en el servidor:', error });
    }
};
