const getCart = require("../controllers/getCart")

module.exports = async (req, res) => {
    try {

        const data = await getCart(req)
        if (data.status) {
            return res.status(200).json({
                movies:data.movies,
                sid:data.movies.sid
            });
        }else{
            return res.status(501).json({ message:data.message });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error})
    }
}