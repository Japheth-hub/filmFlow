
const checkDiscount = require('../services/checkDiscount')

module.exports = async (req, res) => {
    try {

        const discount = await checkDiscount(req.body);

        if(discount.status){
           return  res.status(201).json({ movies: discount.movies });
        }else{
            return res.status(500).json({ message: discount.message });
        }

    } catch (error) {
        console.error("Error generating code:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

