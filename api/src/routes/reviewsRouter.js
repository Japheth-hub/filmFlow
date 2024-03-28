const { Router } = require("express");
const postReviewsHandler = require('../handlers/postReviewsHandler');
const getReviewsHandler = require("../handlers/getReviewsHandler");


const reviewsRouter = Router();

reviewsRouter.get('/', getReviewsHandler)
reviewsRouter.post('/', postReviewsHandler)

module.exports = reviewsRouter;