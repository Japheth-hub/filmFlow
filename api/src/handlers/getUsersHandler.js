const getUsers = require("../controllers/getUsers");

module.exports = async (req, res) => {
    try {
        const data = await getUsers(req.query);

        const modifiedData = data.map(({ dataValues, roleName }) => ({
            ...dataValues,
            roleId: dataValues.roleId,
            roleName: roleName || 'Unknown',
        }));

        return res.status(200).json(modifiedData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};
