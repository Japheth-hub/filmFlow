require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize( 
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => {
  entry[0] = entry[0].split("_");
  entry[0] = entry[0].map((item)=>{
    return item[0].toUpperCase() + item.slice(1);
  });
  entry[0] = entry[0].join("");
  return [
    entry[0],
    entry[1],
  ]
});

sequelize.models = Object.fromEntries(capsEntries);
const { User, Movie, Genre, Review, Role, Cart, Purchase,Country,Report, Discount } = sequelize.models;

Movie.belongsToMany(Genre, { through: "movie_genre" });
Genre.belongsToMany(Movie, { through: "movie_genre" });

Movie.hasMany(Review)
Review.belongsTo(Movie)
Movie.belongsTo(User)
Report.belongsTo(User);

User.hasMany(Review)
User.hasMany(Movie)
User.belongsTo(Role)
Review.belongsTo(User)

Purchase.belongsTo(User)
Purchase.belongsToMany(Movie, { through: "movie_purchase" });
User.hasMany(Purchase);
Movie.belongsToMany(Purchase, { through: "movie_purchase" })

User.belongsToMany(Movie, { through: Cart });
Movie.belongsToMany(User, { through: Cart });


Movie.belongsToMany(Country, { through: "movie_country" })
Country.belongsToMany(Movie, { through: "movie_country" })

Discount.belongsToMany(Movie, { through: "discount_movie" });
Movie.belongsToMany(Discount, { through: "discount_movie" });

Discount.belongsToMany(Genre, { through: "discount_genre" });
Genre.belongsToMany(Discount, { through: "discount_genre" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};