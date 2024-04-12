const { User } = require('../db');
const sendEmail = require('./sendEmail');

module.exports = async (body) => {
    try {
        //Esta esperando recibir los siguientes parametros por body de la siguiente manera:
        //{
        //     "auth": "(sid del usuario actual)",
        //     "sid": "(sid del usuario al que se realizo el pago)"
        //}
        const { sid } = body;

        const producer = await User.findOne({
            where: { sid }
        })
        
        const paymentInfo = {
            destination: `${producer.email}`,
            topic: "Pago recibido",
            content: `Se ha realizado con exito el pago de ${producer.payment_amount}$ a su cuenta de ${producer.payment_method} asociada a FilmFlow`,
        };
        
        try {
            await sendEmail(paymentInfo);
        } catch (error) {
            console.error('Error sending email:', error);
        }

        producer.payment_amount = null;

        await producer.save();

        return { status: true, message: "Notificación al producer enviada exitosamente" };
    } catch (error) {
        console.error(error);
        return { status: false, message: 'Error en el servidor', error };
    }
};