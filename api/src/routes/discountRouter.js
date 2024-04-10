const { Router } = require("express");
const getDiscounts = require('../controllers/getDiscounts')
const postDiscount = require('../controllers/postDiscount')
const putDiscount = require('../controllers/putDiscount')
const getMovieDiscount = require('../controllers/getMovieDiscount')
const getGenreDiscount = require('../controllers/getGenreDiscount')
const discountRouter = Router();

discountRouter.get('/', getDiscounts)
discountRouter.get('/movie/:id', getMovieDiscount)
discountRouter.get('/genre/:id', getGenreDiscount)
discountRouter.post('/', postDiscount)
discountRouter.put('/:code',putDiscount)

module.exports = discountRouter;