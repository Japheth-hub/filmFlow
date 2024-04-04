const {User,Role} = require('../db');

module.exports = async (req,res,next)=>{

    const {auth} = req.body;
    
    if(auth){
        const user = await User.findOne({include:{
            model:Role,
            attributes:["role"],
        },where:{sid:auth}});
        req.query.user = user.toJSON();
    }
   
    return next();


}