const { Router } = require("express");
const postCheckoutHandler = require("../handlers/postCheckoutHandler");
const getCheckAuth = require('../middlewares/getCheckAuth.js')
const checkoutRouter = Router();


checkoutRouter.post("/",getCheckAuth, postCheckoutHandler);


module.exports = checkoutRouter;
