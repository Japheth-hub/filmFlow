const getUsers = require("../controllers/getUsers")

module.exports = async (req, res) => {
    try {

        const data = await getUsers(req.query)

        return res.status(200).json(data);
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error})
    }
}