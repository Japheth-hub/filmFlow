const { Router } = require("express");
const getDashboardHandler = require('../handlers/getDashboardHandler');
const postProducerReportCron = require('../controllers/postProducerReportCron');


const getCheckAuth = require("../middlewares/getCheckAuth");
const dashboardRouter = Router();


dashboardRouter.get('/:auth', getCheckAuth, getDashboardHandler);
dashboardRouter.get('/report/', getCheckAdmin, postProducerReportCron.dailyJob());

module.exports = dashboardRouter;