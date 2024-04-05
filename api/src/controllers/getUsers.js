const { User} = require('../db')

module.exports = async () => {
    try {
        const users = await User.findAll();
        return users
    } catch (error) {
        return error
    }
}