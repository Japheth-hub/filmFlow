const postMovies = require("../controllers/postMovies")

module.exports = async (req, res) => {
    try {

        const data = await postMovies(req)
        if (!data.status) {
            return res.status(204).send(data.message)
        }

        return res.status(200).send(data.message)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}