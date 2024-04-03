require("dotenv").config();
const { KEY_SECRET,ENDPOINT } = process.env;
const stripe = require("stripe")(KEY_SECRET);
const postPurchase = '../controllers/postPurchase.js'

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
      
      const purchaseInfo = {
        sid:checkoutSessionCompleted.metadata.sid,
        amount:checkoutSessionCompleted.amount_total,
      }
      postPurchase(purchaseInfo)
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  } 

  // Return a 200 response to acknowledge receipt of the event
  response.send("Complete");
};
