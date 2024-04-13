const { Router } = require("express");
const postMoviesHandler = require('../handlers/postMoviesHandler')
const getMoviesHandler = require('../handlers/getMoviesHandler')
const getMoviesIdHandler = require('../handlers/getMoviesIdHandler')
const putMoviesHandler = require('../handlers/putMoviesHandler');
const deleteMoviesHandler = require("../handlers/deleteMoviesHandler");
const restoredMoviesHandler = require("../handlers/restoredMoviesHandler");
const checkAuth = require('../middlewares/checkAuth')
const getAuth = require('../middlewares/getAuth')
const checkAdmin = require('../middlewares/checkAdmin');
const putMovieStatusHandler = require("../handlers/putMovieStatusHandler");

const moviesRouter = Router();

moviesRouter.get('/',getAuth, getMoviesHandler);
moviesRouter.get('/:id',getAuth, getMoviesIdHandler);
moviesRouter.get("/restore/:id", restoredMoviesHandler);
moviesRouter.post('/',checkAuth, postMoviesHandler);
moviesRouter.put('/status/:id', checkAdmin, putMovieStatusHandler)
moviesRouter.put('/:id', putMoviesHandler);
moviesRouter.delete('/:id', deleteMoviesHandler)

module.exports = moviesRouter;