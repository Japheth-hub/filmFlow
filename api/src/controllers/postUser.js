const { User, Role } = require("../db");
const sendEmail = require("./sendEmail");
require("dotenv").config();
const {URL_BACK} = process.env

module.exports = async (body) => {
  const errors = {};
  let { email, name, sid, picture, nickname } = body;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const mailInfo = {
        destination: "correo",
        topic: "Asunto",
        content: "Mensaje del mail",
    }

  if (!email || !regex.test(email)) {
    errors.email = "Falta un correo válido";
  }

  if (!nickname) {
    errors.nickname = "Falta un nickname";
  }

  if (!name) {
    name = nickname;
  }

  if (!sid || sid.length !== 32) {
    errors.sid = "Falta un sid válido";
  }

  if (Object.keys(errors).length === 0) {
    const role = await Role.findOne({ where: { role: "viewer" } });
    const adminRole = await Role.findOne({ where: { role: "admin" } });
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, picture, roleId: role.id, sid },
    });

    if (!created) {
      user.sid = sid;
      await user.save();
    } else {
      //Envio de correos al crear un registrarse
      const mailInfo = {
        destination: `${user.email}`,
        topic: "Bienvenido a FilmFlow",
        content: `Gracias por registrarse en nuestra web. <br/> <a href="${URL_BACK}account">Haga click aquí para ir a su cuenta</a>.`
      }
      const emailResponse = await sendEmail(mailInfo)
      console.log(emailResponse)
      //
    }

    const isAdmin = user.roleId === adminRole.id;

    return { status: true, sid: user.sid, isAdmin }; 
  } else {
    
    return { status: false, errors };
  }
};
