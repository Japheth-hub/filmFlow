const {Report} = require('../db');
const getCurrentMonthName = require('../services/getCurrentMonth')
module.exports = async(type,result,user)=>{
    try {
        const [report, created] = await Report.findOrCreate({
            where: {
                period: getCurrentMonthName(),
                userId: user.id
            },
            defaults: { type, result }
        });
        return report;
    } catch (error) {
        console.log(error);
    }
}