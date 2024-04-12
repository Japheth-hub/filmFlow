const { Router } = require("express");
const getDiscounts = require('../controllers/getDiscounts')
const putDiscount = require('../controllers/putDiscount')
const getMovieDiscount = require('../controllers/getMovieDiscount')
const getGenreDiscount = require('../controllers/getGenreDiscount');
const postDiscountHandler = require("../handlers/postDiscountHandler");
const applyDiscountHandler = require("../handlers/applyDiscountHandler");
const discountRouter = Router();

discountRouter.get('/', getDiscounts)
discountRouter.post('/apply', applyDiscountHandler);
discountRouter.get('/movie/:id', getMovieDiscount)
discountRouter.get('/genre/:id', getGenreDiscount)
discountRouter.post('/', postDiscountHandler);
discountRouter.put('/:code',putDiscount);

module.exports = discountRouter;