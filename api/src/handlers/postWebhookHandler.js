require("dotenv").config();
const { KEY_SECRET,ENDPOINT } = process.env;
const stripe = require("stripe")(KEY_SECRET);
const axios = require('axios')

module.exports = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  const endpointSecret = ENDPOINT;
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    // console.log("eset es el event", event);
  } catch (err) {
    console.log("estes es el error", err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      // podemos guarddar en base de datos
      // podemos enviar un email
      // podemos enviar un sms
      // console.log(checkoutSessionCompleted);
      console.log(checkoutSessionCompleted.customer_details);
      console.log(checkoutSessionCompleted.amount_total);
      console.log(checkoutSessionCompleted.metadata);
      await axios.post(`http://localhost:3001/cart/buy`, {
        auth: checkoutSessionCompleted.metadata.sid,
        amount:checkoutSessionCompleted.amount_total
      });
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  } 

  // Return a 200 response to acknowledge receipt of the event
  response.send("Complete");
};
