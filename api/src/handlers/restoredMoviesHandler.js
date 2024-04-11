const restoredMovies = require('../controllers/restoredMovies')

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await restoredMovies(id);

        if (data.message) {
        res.status(404).json(data);
        return;
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};