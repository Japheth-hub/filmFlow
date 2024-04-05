const { Router } = require("express");
const getDashboardHandler = require('../handlers/getDashboardHandler');

const getCheckAuth = require("../middlewares/getCheckAuth");
const dashboardRouter = Router();


dashboardRouter.get('/:auth', getCheckAuth, getDashboardHandler);

module.exports = dashboardRouter;