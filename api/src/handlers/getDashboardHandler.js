
const getDashboard = require('../controllers/getDashboard');

module.exports = async (req,res)=>{
    try {
        const data = await getDashboard(req);
        return res.json(data);
    } catch (error) {
        return res.status(500,{message:error.message})
    }


}