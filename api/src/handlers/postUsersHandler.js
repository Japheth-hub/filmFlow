const postUser = require("../controllers/postUser")

module.exports = async (req, res) => {
    try {
        const body = req.body

        const data = await postUser(body)

        if (data.status) {
            return res.status(201).json({sid:data.sid});
        }else{
            return res.status(501).json({errors:data.errors});
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error})
    }
}