const { User,Role } = require('../db');
const users = require('../utils/users')


module.exports = async () => {
    try {
        let count = 0;
        for(let user of users){
            const {name, email, sid, picture,role} = user
            const roleDB = await Role.findOne({where:{role}});
            const userDB = await User.create({name, email,  sid, picture});
            await userDB.setRole(roleDB);
            if (role === "producer") {
                userDB.phone = 123456789+Math.floor(Math.random() * (10 - 1 + 1)) + 1;
                userDB.payment_method = "paypal"
                userDB.payment_account = email
                userDB.payment_amount = 85
                await userDB.save();
            }
            count++
        }
        console.log(`Successfully created ${count} Users`)
    } catch (error) {
        console.log('Error al cargar usuarios', error)
    }
}