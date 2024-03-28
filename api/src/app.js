const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const server = express();
const router = require('./routes')
const postWebhookHandler = require('../src/handlers/postWebhookHandler')


server.name = "API";


//Esta ruta necesita estar aqui, ya que no debe ser procesada ------------------
server.post("/checkout/webhook",express.raw({ type: 'application/json' }), postWebhookHandler);
//------------------------------------------------------------------------------


server.use(bodyParser.urlencoded({ extended: true, limit: "200mb" }));
server.use(bodyParser.json({ limit: "200mb" }));

server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(router);

module.exports = server;