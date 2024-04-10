const {Report} = require('../db');
const getCurrentMonth = require('../services/getCurrentMonth')
module.exports = async(query)=>{
    const {user} = query;
    let options = {};
    try {
        if(user){
            options = {
                where:{
                    userId:user.id,
                    period:getCurrentMonth(),
                },
                order: [['createdAt', 'DESC']]
            }
        }
        const reports = await Report.findOne({
            ...options
        });
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