const { Router } = require("express");
const getDashboardHandler = require('../handlers/getDashboardHandler');
const postProducerReportCron = require('../controllers/postProducerReportCron');
const getCheckAdmin = require('../middlewares/getCheckAdmin')


const getCheckAuth = require("../middlewares/getCheckAuth");
const dashboardRouter = Router();


dashboardRouter.get('/:auth', getCheckAuth, getDashboardHandler);
dashboardRouter.post('/report/', getCheckAdmin, async()=> await postProducerReportCron.dailyJob());

module.exports = dashboardRouter;