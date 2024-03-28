const { User} = require('../db')

module.exports = async () => {
    try {
        const users = await User.findAll();
        return {status:true,users}
    } catch (error) {
        return error
    }
}