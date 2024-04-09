const { User, Role } = require('../db');

module.exports = async (user, body) => {
    try {
        //Esta esperando recibir los siguientes parametros por body de la siguiente manera:
        //{
        //     "auth": "(sid del usuario actual)",
        //     "paymentMethod": "(metodo de pago: zelle, paypal o binance)",
        //     "paymentAcoount": "(correo al que realizar el pago de la cuenta seleccionada)",
        //     "phoneNumber": "(numero telefonico)",
        //}
        const { paymentMethod, paymentAccount, phoneNumber } = body;

        const existingUser = await User.findOne({
            where: { phone_number: phoneNumber }
        });

        if (existingUser && existingUser.sid !== user.sid) {
            return { status: false, message: "Ya hay un usuario con ese número de teléfono." };
        }
        
        const producerRole = await Role.findOne({
            where: { role: producer }
        })

        user.roleId = producerRole.id;
        user.phone_number = phoneNumber;
        user.payment_method = paymentMethod;
        user.payment_account = paymentAccount;

        await user.save();

        return { status: true, message: "Datos actualizados exitosamente" };
    } catch (error) {
        console.log(error);
        return { status: false, message: 'Error en el servidor', error };
    }
};