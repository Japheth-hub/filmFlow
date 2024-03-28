const roles = require('../utils/roles');
const { Role } = require('../db');

module.exports = async()=>{
    let count = 0
    for (role of roles) {
        const [newRole, created] = await Role.findOrCreate({
            where: { role },
        });

        if (created) {
            count++
        }
    }
    console.log(`Successfully created ${count} roles`);
}