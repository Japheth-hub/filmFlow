const { Purchase, Cart, User,Movie } = require('../db');
const { Op } = require('sequelize');
const sendEmail = require('./sendEmail');

module.exports = async (purchaseInfo) => {
    try {
        let {sid,amount,movies,method,currency,stripeId,status} = purchaseInfo;
        const user = await User.findOne({where:{sid}});

        movies = movies.split(",");

        const purchase = await Purchase.create({
            userId: user.id,
            amount,
            method,
            currency,
            stripeId,
            status
         });
           

        const moviesDB = await Movie.findAll({
            where: {
                id: {
                [Op.in]: movies,
                },
            },
        });
 
        //Pago a los producers involucrados en la compra:
        for (const movie of moviesDB) {
            if (!movie.userId) {
                continue;
            }

            const producer = await User.findOne({
                where: { id: movie.userId }
            });

            const producerPay = movie.price / 2;
            
            producer.payment_amount = (producer.payment_amount || 0) + producerPay;
            
            await producer.save();
        }
        //

        purchase.setMovies(moviesDB);

        const rows = await Cart.destroy({
            where: {
                userId: user.id
            }
        })

        if (!rows) {
            console.log("error eliminando las peliculas del carrito")
        }
        
        //Prueba para el envio de mails
        const mailInfo = {
            destination: user.email,
            topic: "Compra realizada",
            content: `Se ha confirmado su compra`,
        }

        try {
            const emailResponse = await sendEmail(mailInfo);
            console.log(emailResponse.message)
        } catch (error) {
            console.log('Error sending email:', error);
        }
        //
        console.log("peliculas compradas con exito")
   
    } catch (error) {
        console.log(error);
        return error
    }
}

