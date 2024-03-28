const { Router } = require("express");
const postCheckoutHandler = require("../handlers/postCheckoutHandler");
const checkoutRouter = Router();


checkoutRouter.post("/", postCheckoutHandler);


module.exports = checkoutRouter;
