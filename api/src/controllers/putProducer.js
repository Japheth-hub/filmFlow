const { User, Role } = require('../db');

module.exports = async (body) => {
    try {
        //Esta esperando recibir los siguientes parametros por body de la siguiente manera:
        //{
        //     "auth": "(sid del usuario actual)",
        //     "paymentMethod": "(metodo de pago: zelle, paypal o binance)",
        //     "paymentAcoount": "(correo al que realizar el pago de la cuenta seleccionada)",
        //     "phoneNumber": "(numero telefonico)",
        //}
        const { auth, paymentMethod, paymentAccount, phoneNumber } = body;

        const currentUser = await User.findOne({
            where: { sid: auth }
        })

        const existingUser = await User.findOne({
            where: { phone: phoneNumber }
        });

        if (existingUser && existingUser.sid !== currentUser.sid) {
            return { status: false, message: "Ya hay un usuario con ese número de teléfono." };
        }
        
        const producerRole = await Role.findOne({
            where: { role: "producer" }
        })

        currentUser.roleId = producerRole.id;
        currentUser.phone = phoneNumber;
        currentUser.payment_method = paymentMethod;
        currentUser.payment_account = paymentAccount;

        await currentUser.save();

        return { status: true, message: "Datos actualizados exitosamente" };
    } catch (error) {
        console.log(error);
        return { status: false, message: 'Error en el servidor', error };
    }
};