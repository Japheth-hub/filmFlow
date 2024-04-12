const { User, Role } = require('../db');
const users = require('../utils/users');

function getRandomPhone() {
    // Genera un número aleatorio de 9 dígitos
    return Math.floor(100000000 + Math.random() * 900000000);
}

function getRandomPaymentMethod() {
    // Genera un método de pago aleatorio entre 'paypal', 'zelle', o 'binance'
    const paymentMethods = ['paypal', 'zelle', 'binance'];
    return paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
}

function getRandomPaymentAmount() {
    // Genera un número aleatorio de hasta 3 dígitos
    return Math.floor(Math.random() * 1000);
}

module.exports = async () => {
    try {
        let count = 0;
        for (let user of users) {
            const { name, email, sid, picture, role } = user;
            const roleDB = await Role.findOne({ where: { role } });
            const userDB = await User.create({ name, email, sid, picture });
            await userDB.setRole(roleDB);
            if (role === "producer") {
                userDB.phone = getRandomPhone();
                userDB.payment_method = getRandomPaymentMethod();
                userDB.payment_account = email;
                userDB.payment_amount = getRandomPaymentAmount();
                await userDB.save();
            }
            count++;
        }
        console.log(`Successfully created ${count} Users`);
    } catch (error) {
        console.log('Error al cargar usuarios', error);
    }
};
