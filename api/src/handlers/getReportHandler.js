const getReports = require("../controllers/getReports")

module.exports = async (req, res) => {
    try {

        const reports = await getReports(req.query)
        if (data.status) {
            return res.status(200).json({
                reports,
            });
        }else{
            return res.status(501).json({ message:data.message });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error})
    }
}