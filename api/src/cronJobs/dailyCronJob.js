const cron = require('node-cron');
const postProducerReportCron = require('../controllers/postProducerReportCron');

module.exports =  ()=>{
    cron.schedule('0 9 * * *', async() => {
        // cron.schedule('*/1 * * * *', () => { for testing
            await postProducerReportCron.dailyJob(); 
        }, {
            timezone: 'America/Mexico_City' 
    });
}