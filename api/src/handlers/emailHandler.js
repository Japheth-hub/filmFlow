const sendEmail = require("../controllers/sendEmail")

module.exports = async (req, res) => {
    try {
        const emailInfo = req.body
        console.log(emailInfo)
        const data = await sendEmail(emailInfo)

        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
} 