const {Report} = require('../db');
const getCurrentMonth = require('../services/getCurrentMonth')
module.exports = async(query)=>{
    const {user} = query;
    let options = {};
    try {
        console.log(getCurrentMonth(),user.id);
        if(user){
            options = {
                where:{
                    type:"producerMonthReport",
                    userId:user.id,
                    period:getCurrentMonth(),
                },
                order: [['createdAt', 'DESC']]
            }
        }
        const reports = await Report.findOne({
            ...options
        });
        console.log(reports);

        if(reports){
            return reports.result;
        }else{
            console.log(0);
            return 0;
        }
    } catch (error) {
        console.log(error);
    }
}