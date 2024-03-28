const {User, Role} = require('../db.js');
module.exports = async (user) => {
    const isAdmin = false;
    const role = await Role.findOne({where:{role:"admin"}});
    if(user.roleid === role.id) isAdmin = true;
    return isAdmin;
}