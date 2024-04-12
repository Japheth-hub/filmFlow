const { User, Role } = require('../db');
const { Op } = require('sequelize');

module.exports = async (query) => {
    const {today,limit} = query;
    try {
        options = {};
        if(today){
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            options.where = {
                createdAt: {
                    [Op.gte]: currentDate
                  }
            }
        }
        const roles = await Role.findAll({...options});

        const users = await User.findAll({ paranoid : false});
        for (const user of users) {
            const userRole = roles.find(role => role.id === user.roleId);
            if (userRole) {
                user.roleName = userRole.role;
            } else {
                user.roleName = 'Unknown';
            }
        }

        return users;
    } catch (error) {
        console.log(error)
        return error;
    }
}
