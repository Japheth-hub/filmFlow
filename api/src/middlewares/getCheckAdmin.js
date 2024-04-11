const { User, Role } = require("../db");
module.exports = async (req, res, next) => {
  const errors = {};
  let { auth } = req.params;

  console.log(req.body);
  if(!auth){
    auth  = req.body.auth;
    console.log(`el Auth iene en body ${auth}`);
  }

  if (!auth)
    return res
      .status(403)
      .json({ status: false, message: "Falta sid en petición" });

  const user = await User.findOne({ where: { sid: auth } });
  const role = await Role.findOne({ where: { role: "admin" } });
  if (!user)
    return res
      .status(403)
      .json({ status: false, message: "El usuario no existe" });
  if (user.roleId !== role.id)
    return res
      .status(403)
      .json({
        status: false,
        message: "No tienes privilegios para realizar esta acción",
      });
  req.user = user.toJSON();
  return next();
};
