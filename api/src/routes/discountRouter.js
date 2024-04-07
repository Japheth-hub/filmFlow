const { Router } = require("express");
const getDiscounts = require('../controllers/getDiscounts')
const postDiscount = require('../controllers/postDiscount')
const putDiscount = require('../controllers/putDiscount')
const discountRouter = Router();

discountRouter.get('/', getDiscounts)
discountRouter.post('/', postDiscount)
discountRouter.put('/:code',putDiscount)

module.exports = discountRouter;