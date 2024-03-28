const { User,Role } = require('../db');
const users = require('../utils/users')


module.exports = async () => {
    try {
        let count = 0;
        for(let user of users){
            const {name, email,sid} = user
            const role = await Role.findOne({where:{role:user.role}})
            await User.create({name, email, roleId:role.id,sid})
            count++
        }
        console.log(`Successfully created ${count} Users`)
    } catch (error) {
        console.log('Error al cargar usuarios', error)
    }
}