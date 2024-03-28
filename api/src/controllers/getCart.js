const { Cart, Movie } = require("../db");
const createCart = require('../services/createCart');

module.exports = async (req) => {
  try {
    const user = req.user;
    const userId = user.id;
    const movies = await createCart(user);
    return { status: true, movies };
  } catch (error) {
    console.log(error);
    return error;
  }
};
