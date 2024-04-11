
const postDiscount = require('../controllers/postDiscount')

module.exports = async (req, res) => {
    try {

        const discount = await postDiscount(req);

        if(discount.status){
           return  res.status(201).json({ code: discount.discount });
        }else{
            return res.status(500).json({ message: discount.message });
        }

    } catch (error) {
        console.error("Error generating code:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

