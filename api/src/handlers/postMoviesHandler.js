const postMovies = require("../controllers/postMovies")

module.exports = async (req, res) => {
    try {

        const data = await postMovies(req)

        if (!data.status) {
            return res.status(500).json(data)
        }

        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: error})
    }
}