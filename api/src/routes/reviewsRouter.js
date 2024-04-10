const { Router } = require("express");
const postReviewsHandler = require('../handlers/postReviewsHandler');
const getReviewsHandler = require("../handlers/getReviewsHandler");
const deleteReviewHandler = require("../handlers/deleteReviewHandler");


const reviewsRouter = Router();

reviewsRouter.get('/', getReviewsHandler)
reviewsRouter.post('/', postReviewsHandler)
reviewsRouter.delete('/:id', deleteReviewHandler)

module.exports = reviewsRouter;