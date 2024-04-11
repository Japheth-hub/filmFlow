require("dotenv").config();
const {KEY_SECRET,URL_BACK} = process.env
const stripe = require('stripe')(KEY_SECRET);

module.exports = async function postCheckout(products, metaData){
  
    const session = await stripe.checkout.sessions.create({
      success_url: `${URL_BACK}success`,
      line_items: products,
      metadata: metaData,
      mode: 'payment',
    });

    return session
}
