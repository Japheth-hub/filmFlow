const {User,Role} = require('../db')
module.exports = async (req,res,next)=>{
    const errors = {};
    const {auth} = req.body;
    const {id} = req.params;

    
    if(!auth) return res.status(403).json({status:false,message:"Falta sid en petición"});
    
    const user = await User.findOne({where:{id}});
    const role = await Role.findOne({where:{role:"admin"}});
    if(!user) return res.status(403).json({status:false,message:"El usuario no existe"});
    if(user.roleId === role.id) return next();
    if(user.sid === auth) return next();
   
    return res.status(403).json({status:false,message:"No tienes privilegios sobre esta información"});


}