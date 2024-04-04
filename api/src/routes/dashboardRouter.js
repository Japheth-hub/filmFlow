const { Router } = require("express");
const getDashboardHandler = require('../handlers/getDashboardHandler');

const checkAuth = require('../middlewares/checkAuth');
const dashboardRouter = Router();


dashboardRouter.get('/', checkAuth, getDashboardHandler);

module.exports = dashboardRouter;