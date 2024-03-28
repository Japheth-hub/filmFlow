const { Router } = require("express");
const postMoviesHandler = require('../handlers/postMoviesHandler')
const getMoviesHandler = require('../handlers/getMoviesHandler')
const getMoviesIdHandler = require('../handlers/getMoviesIdHandler')
const putMoviesHandler = require('../handlers/putMoviesHandler');
const deleteMoviesHandler = require("../handlers/deleteMoviesHandler");
const checkAuth = require('../middlewares/checkAuth')

const moviesRouter = Router();

moviesRouter.get('/', getMoviesHandler);
moviesRouter.get('/:id', getMoviesIdHandler);
moviesRouter.post('/',checkAuth, postMoviesHandler);
moviesRouter.put('/:id', putMoviesHandler);
moviesRouter.delete('/:id', deleteMoviesHandler)

module.exports = moviesRouter;