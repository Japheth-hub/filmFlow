const { Router } = require("express");
const postUsersHandler = require('../handlers/postUsersHandler');
const getUsersHandler = require('../handlers/getUsersHandler');
const deleteUserHandler = require('../handlers/deleteUserHandler');
const putUserHandler = require("../handlers/putUserHandler");

const checkAdmin = require('../middlewares/checkAdmin');
const getCheckAdmin = require('../middlewares/getCheckAdmin')
const checkOwner = require('../middlewares/checkOwner');


const usersRouter = Router();
usersRouter.post('/', postUsersHandler);


usersRouter.get('/:auth', getCheckAdmin, getUsersHandler);
usersRouter.delete("/:id/:auth", getCheckAdmin, deleteUserHandler);
usersRouter.put('/', checkAdmin, putUserHandler);



// usersRouter.get('/:id', getMoviesIdHandler);
// usersRouter.put('/:id', putMoviesHandler);

module.exports = usersRouter;