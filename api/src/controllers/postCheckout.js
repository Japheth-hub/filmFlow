require("dotenv").config();
const {KEY_SECRET} = process.env
const stripe = require('stripe')(KEY_SECRET);
module.exports = async function postCheckout(products){
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/success',
      line_items: products,
      mode: 'payment',
    });

    return session
}
