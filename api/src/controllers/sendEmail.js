require("dotenv").config();
const { RESEND_API_KEY } = process.env;
const { Resend } = require('resend');
const emailTemplate = require('../utils/emailTemplate')

module.exports = async (mailInfo) => {
    //Ejemplo de mailInfo:
    //mailInfo = {
    //    destination: "correo",
    //    topic: "Asunto",
    //    content: "Mensaje del mail",
    //}

    const resend = new Resend(RESEND_API_KEY);
    
    const { destination, topic, content } = mailInfo;

    const username = destination.split('@')[0];

    const htmlContent = emailTemplate(username, content);

    try {
        const emailResponse = await resend.emails.send({
            from: 'FilmFlow <noreply@filmflow.chekogarcia.com.mx>',
            to: destination,
            subject: topic,
            html: htmlContent
        });
        console.log(emailResponse)
        return { status: true, message: `Email sent successfully to ${destination}`, emailResponse };
    } catch (error) {
        return { status: false, message: "Error occurred sending the email", error };
    }
};