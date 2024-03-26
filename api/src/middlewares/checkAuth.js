const {User} = require('../db')
module.exports = async (req,res,next)=>{
    const errors = {};
    const {auth} = req.body;
    
    if(!auth) return res.status(403).json({status:false,message:"Falta sid en petición"});
    
    const user = await User.findOne({where:{sid:auth}});
    
    if(!user) return res.status(403).json({status:false,message:"El usuario no existe"});
    
    if(user.roleId !== role.id) res.status(403).json({status:false,message:"No tienes privilegios para realizar esta acción"});
    req.user = user;
    return next();


}