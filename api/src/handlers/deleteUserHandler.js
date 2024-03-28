const deleteUser = require('../controllers/deleteUser')

module.exports = async (req, res) => {
    try {
        const {id} = req.params

        const data = await deleteUser(id)

        if(data.status){
            return res.status(200).json(data)
        }

        return res.status(404).json(data)
        

    } catch (error) {
        return res.status(500).json(error)
    }
}