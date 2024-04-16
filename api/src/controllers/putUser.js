const { User, Role } = require('../db');

module.exports = async (body) => {
    try {
        //Esta esperando recibir los siguientes parametros por body de la siguiente manera:
        //{
        //     "auth": "(sid del admin actual)",
        //     "userSid": "(sid del usuario a modificar)",
        //     "roleToChange": "(rol al cual cambiar, producer o admin)"
        //}
        const { userSid, roleToChange } = body;

        const user = await User.findOne({
            where: { sid: userSid }
        });
        if (!user) {
            return { status: false, message: 'Error al encontrar el usuario' };
        }

        const viewerRole = await Role.findOne({ where: { role: "viewer" } });
        const producerRole = await Role.findOne({ where: { role: "producer" } });
        const adminRole = await Role.findOne({ where: { role: "admin" } });

        if (user.roleId === adminRole.id && roleToChange === "admin") {
            return { status: false, message: 'El usuario ya es admin' };
        }
        if (user.roleId === adminRole.id && roleToChange === "producer") {
            return { status: false, message: 'El usuario no puede dejar de ser admin' };
        }
        if (user.roleId === producerRole.id && roleToChange === "producer") {
            return { status: false, message: 'El usuario ya es producer' };
        }
        if (user.roleId === viewerRole.id && roleToChange === "viewer") {
            return { status: false, message: 'El usuario ya es viewer' };
        }
        if (user.roleId === adminRole.id && roleToChange === "viewer" && user.email === "filmflowmail@gmail.com") {
            return { status: false, message: 'No se puede degradar a ese usuario'}
        }

        if (roleToChange === 'admin') {
            user.roleId = adminRole.id;
            await user.save();
            return { status: true, message: 'Cambiado el rol del usuario a admin exitosamente' };
        }
        if (roleToChange === 'producer') {
            user.roleId = producerRole.id;
            await user.save();
            return { status: true, message: 'Cambiado el rol del usuario a producer exitosamente' };
        }
        if (roleToChange === 'viewer') {
            user.roleId = viewerRole.id;
            user.phone = null;
            user.payment_account = null;
            user.payment_method = null;
            await user.save();
            return { status: true, message: 'Cambiado el rol del usuario a viewer exitosamente' };
        }
    } catch (error) {
        console.log(error);
        return { status: false, message: 'Error en el servidor', error };
    }
};


//Viejo putUser:
// const { User } = require('../db')

// module.exports = async (id, body) => {
//     try {
//         const data = {}
//         const user = await User.findOne({where : {id}})
//         if(user){
//             for(let key in body){
//                 if(key!==  "auth") user[key] = body[key] ? body[key] : user[key]
//             }
//             await user.save();
//             return {status:true,user};
//         }
//         return {status:false,message:'No existe pelicula con ese Id'} 
//     } catch (error) {
//         return {status:false,error} 
//     }
// }
