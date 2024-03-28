const { User,Role } = require("../db");
module.exports = async (body) => {
  const errors = {}
  let { email,name,sid,picture,nickname } = body;
  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!email && regex.test(email)){
    errors.email = "Falta un correo válido"
  }
  
  if(!nickname){
    errors.nickname = "Falta un nickname"
  }

  if(!name){
    name = nickname
  }

  if(!sid || sid.length !== 32){
    errors.sid = "Falta un sid válido"
  }

  if (Object.keys(errors).length === 0) {
    const role = await Role.findOne({where:{role:"viewer"}})
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name,picture,roleId:role.id,sid },
    });

    if(!created){
      user.sid = sid;
      user.save();
    }

  
    return {status:true,sid:user.sid}
    
  }else{
    return {status:false,errors}
  }

};

