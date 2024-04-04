require("dotenv").config();
const { RESEND_API_KEY } = process.env;
const { Resend } = require('resend');

module.exports = async (mailInfo) => {
    //Ejemplo de mailInfo:
    //mailInfo = {
    //    destination: "correo",
    //    topic: "Asunto",
    //    content: "Mensaje del mail",
    //}

    const { destination, topic, content } = mailInfo;
    const resend = new Resend(RESEND_API_KEY);

    try {
        await resend.emails.send({
            from: 'filmflow@resend.dev',
            to: destination,
            subject: topic,
            html: `<p>${content}</p>`
        });
        return { status: true, message: `Email sent successfully to ${destination}` };
    } catch (error) {
        return { status: false, message: "Error occurred sending the email", error };
    }
};