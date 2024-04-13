const {User,Role} = require('../db');

module.exports = async (req,res,next)=>{

    let { auth } = req.params;

    if(!auth){
        auth  = req.body.auth;
    }

    if(!auth){
        auth  = req.query.auth;
    }
    
    if(auth){
        const user = await User.findOne({include:{
            model:Role,
            attributes:["role"],
        },where:{sid:auth}});

        if(user){
            req.query.user = user.toJSON();
        }
    }
   
    return next();


}