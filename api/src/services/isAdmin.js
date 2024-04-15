const { Role } = require('../db.js');
module.exports = async (user) => {
    let isAdmin = false;
    const role = await Role.findOne({where:{role:"admin"}});
    if(user.roleId === role.id) isAdmin = true;
    return isAdmin;
}