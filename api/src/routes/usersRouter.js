const { Router } = require("express");
const postUsersHandler = require('../handlers/postUsersHandler');
const getUsersHandler = require('../handlers/getUsersHandler');
const deleteUserHandler = require('../handlers/deleteUserHandler');
const checkAdmin = require('../middlewares/checkAdmin');


const usersRouter = Router();
usersRouter.post('/', postUsersHandler);


usersRouter.get('/', checkAdmin, getUsersHandler);
usersRouter.delete('/:id',checkAdmin, deleteUserHandler);



// usersRouter.get('/:id', getMoviesIdHandler);
// usersRouter.put('/:id', putMoviesHandler);

module.exports = usersRouter;