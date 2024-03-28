const postPurchase = require("../controllers/postPurchase");

module.exports = async (req, res) => {
    try {

        const data = await postPurchase(req)

        if (data.status) {
            return res.status(200).json({ message:data.message });
        }else{
            return res.status(501).json({ message:data.message });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error})
    }
}