const { User,Role } = require('../db');
const users = require('../utils/users')


module.exports = async () => {
    try {
        let count = 0;
        for(let user of users){
            const {name, email, sid, picture,role} = user
            const roleDB = await Role.findOne({where:{role}});
            console.log(roleDB);
            const userDB = await User.create({name, email,  sid, picture});
            await userDB.setRole(roleDB);
            count++
        }
        console.log(`Successfully created ${count} Users`)
    } catch (error) {
        console.log('Error al cargar usuarios', error)
    }
}