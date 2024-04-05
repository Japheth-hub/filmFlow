const postMovies = require("../controllers/postMovies")

module.exports = async (req, res) => {
    try {

        const data = await postMovies(req)

        if (!data.status) {
            return res.status(204).text(data.message)
        }

        return res.status(200).text(data.message)
    } catch (error) {
        return res.status(500).json({ message: error})
    }
}