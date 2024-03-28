const {User} = require('../db')
module.exports = async (req,res,next)=>{
    console.log("Se recibe");
    const {auth} = req.body;
    
    if(!auth) return res.status(403).json({status:false,message:"Falta sid en petición"});
    
    const user = await User.findOne({where:{sid:auth}});
    
    if(!user) return res.status(403).json({status:false,message:"El usuario no existe"});

    req.user = user.toJSON();
    return next();


}