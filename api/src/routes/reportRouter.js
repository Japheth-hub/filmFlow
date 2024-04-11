const { Router } = require("express");
const checkAuth = require('../middlewares/checkAuth');
const getCheckAuth = require('../middlewares/getCheckAuth');
const getReportHandler = require('../handlers/getReportHandler')


const cartRouter = Router();

cartRouter.get('/:auth', getCheckAuth, getReportHandler)
// cartRouter.post('/', checkAuth, postCartHandler)
// cartRouter.post('/buy', checkAuth, postPurchaseHandler)
// cartRouter.delete('/:movieId', checkAuth, deleteCartHandler)

module.exports = cartRouter;