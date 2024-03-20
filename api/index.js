const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const saveGenres = require('./src/services/saveGenresToDB.js')


conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    try {
      await saveGenres();
    } catch (error) {
      console.log(error);
    }
      console.log("%s listening at 3001"); 
  });
});