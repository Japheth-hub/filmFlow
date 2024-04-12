const { Router } = require("express");
const postUsersHandler = require('../handlers/postUsersHandler');
const getUsersHandler = require('../handlers/getUsersHandler');
const deleteUserHandler = require('../handlers/deleteUserHandler');
const putUserHandler = require("../handlers/putUserHandler");
const restoredUsersHandler = require("../handlers/restoredUsersHandler");
const putProducerHandler = require("../handlers/putProducerHandler");
const putProducerPayHandler = require("../handlers/putProducerPayHandler");
const checkAdmin = require('../middlewares/checkAdmin');
const getCheckAdmin = require('../middlewares/getCheckAdmin')
const checkAuth = require('../middlewares/checkAuth');
const checkOwner = require('../middlewares/checkOwner');


const usersRouter = Router();
usersRouter.post('/', postUsersHandler);


usersRouter.get('/:auth', getCheckAdmin, getUsersHandler);
usersRouter.get("/restore/:id", restoredUsersHandler);
usersRouter.delete("/:id/:auth", getCheckAdmin, deleteUserHandler);
usersRouter.put('/', checkAdmin, putUserHandler);
usersRouter.put('/producer', checkAuth, putProducerHandler);
usersRouter.put('/producer/pay', checkAdmin, putProducerPayHandler);



// usersRouter.get('/:id', getMoviesIdHandler);
// usersRouter.put('/:id', putMoviesHandler);

module.exports = usersRouter;