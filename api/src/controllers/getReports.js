const {Report} = require('../db')
module.exports = async(query)=>{
    const {user} = query;
    let options = {};
    try {
        if(user){
            options = {
                where:{
                    userId:user.id,
                }
            }
        }
        const reports = Report.findAll({
            ...options
        });

        return {status:true,reports};
    } catch (error) {
        console.log(error);
    }
}