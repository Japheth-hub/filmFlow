const { Router } = require("express");
const getDashboardHandler = require('../handlers/getDashboardHandler');
const postProducerReportCron = require('../controllers/postProducerReportCron');
const getCheckAdmin = require('../middlewares/getCheckAdmin')


const getCheckAuth = require("../middlewares/getCheckAuth");
const dashboardRouter = Router();


dashboardRouter.get('/:auth', getCheckAuth, getDashboardHandler);
dashboardRouter.post('/report/', getCheckAdmin, async(req,res )=>{
    try {
        const reports = await postProducerReportCron.dailyJob();
        console.log(reports);
        res.json({messege:"se corrio el reporte"})
    } catch (error) {
        console.log(error);
    }
    
});

module.exports = dashboardRouter;