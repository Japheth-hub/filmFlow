const { User, Role } = require('../db');
const { Op } = require('sequelize');

module.exports = async (params) => {
    try {
        const { userSid } = params;

        const producer = await User.findOne({ 
            where: { sid: userSid }, 
            attributes: ["phone", "payment_account", "payment_method", "payment_amount", "roleId"] // Cambiado a attributes
        });
        
        if (!producer) {
            return { status: false, message: "No se pudo encontrar ese usuario" };
        } 
        
        const producerRole = await Role.findOne({ where: { role: "producer" } });

        if (producer.roleId !== producerRole.id) {
            return { status: false, message: "El usuario no es un productor" };
        }

        return { status: true, producerInfo: producer };
    } catch (error) {
        console.error(error);
        return { status: false, message: error };
    }
};
