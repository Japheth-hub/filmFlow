const { User, Role } = require('../db');

module.exports = async (body) => {
    try {
        const { userSid, roleToChange } = body;

        const user = await User.findOne({
            where: { sid: userSid }
        });
        if (!user) {
            return { status: false, message: 'Error fetching user' };
        }

        const producerRole = await Role.findOne({ where: { role: "producer" } });
        const adminRole = await Role.findOne({ where: { role: "admin" } });

        if (user.roleId === producerRole.id && roleToChange !== "admin") {
            return { status: false, message: 'The user already is producer' };
        }
        if (user.roleId === adminRole.id && roleToChange !== "producer") {
            return { status: false, message: 'The user already is admin' };
        }

        if (roleToChange === 'admin') {
            user.roleId = adminRole.id;
            await user.save();
            return { status: true, message: 'Successfully changed the user to admin' };
        }
        if (roleToChange === 'producer') {
            user.roleId = producerRole.id;
            await user.save();
            return { status: true, message: 'Successfully changed the user to producer' };
        }
    } catch (error) {
        console.log(error);
        return { status: false, error };
    }
};
