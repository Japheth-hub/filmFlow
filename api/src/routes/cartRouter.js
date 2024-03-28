const { Router } = require("express");
const checkAuth = require('../middlewares/checkAuth');
const getCheckAuth = require('../middlewares/getCheckAuth')
const postCartHandler = require('../handlers/postCartHandler');
const deleteCartHandler = require('../handlers/deleteCartHandler');
const getCartHandler = require("../handlers/getCartHandler");
const postPurchaseHandler = require("../handlers/postPurchaseHandler");

const cartRouter = Router();

cartRouter.get('/:auth', getCheckAuth, getCartHandler)
cartRouter.post('/', checkAuth, postCartHandler)
cartRouter.post('/buy', checkAuth, postPurchaseHandler)
cartRouter.delete('/:movieId', checkAuth, deleteCartHandler)

module.exports = cartRouter;