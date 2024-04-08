const { User, Role } = require('../db')

module.exports = async () => {
    try {
        const roles = await Role.findAll();

        const users = await User.findAll();
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
        return error;
    }
}
