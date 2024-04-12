require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const saveRoles = require('./src/services/saveRolesToDB.js');
const saveGenres = require('./src/services/saveGenresToDB.js');
const saveMovies = require("./src/services/saveMoviesToDB.js");
const saveUsers = require("./src/services/saveUsersToDb.js")
const saveReviews = require("./src/services/saveReviewsToDB.js")
const savePurchases = require("./src/services/savePurchasesToDB.js")
const saveCart = require("./src/services/saveMoviesToCart.js")
const saveCountries = require("./src/services/saveCountriesToDB.js")
const { TEST } = process.env;
const router = require('./src/routes/index.js');
const expressListRoutes = require('express-list-routes');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const postProducerReportCron = require('./src/controllers/postProducerReportCron.js')

const dailyCronJob = require('./src/cronJobs/dailyCronJob.js');
dailyCronJob();


conn.sync({ force: TEST === "TRUE" ?true : false }).then(() => {
  
  server.listen(3001, async () => {
    try {
      expressListRoutes(router);
      await saveRoles();
      if (TEST === "TRUE"){
        await saveCountries();
        await saveGenres();
        await saveUsers();
        await saveMovies();
        // await savePurchases();
        await saveReviews();
        await saveCart();
        await postProducerReportCron.dailyJob(); 
      }
    } catch (error) {
      console.log(error);
    }
      console.log("%s listening at 3001"); 
  });
});