const getUsers = require("../controllers/getUsers")

module.exports = async (req, res) => {
    try {

        const data = await getUsers(req.query)

        if (data.status) {
            return res.status(200).json({users:data.users});
        }else{
            return res.status(501).json({message:data.message});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error})
    }
}