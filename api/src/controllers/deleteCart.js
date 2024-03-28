const { Cart } = require('../db');
const createCart = require('../services/createCart')
module.exports = async (req) => {
  try {
    const data = {};
    const user = req.user;
    const { movieId } = req.params;
    const userId = user.id;

    const rows = await Cart.destroy({
      where: {
        userId: userId,
        movieId: movieId,
      }
    });

    if(rows){
      data.exit = 'Pelicula eliminada con exito del carrito'
    }

    data.movies = await createCart(user);

    return data;
    
    
  } catch (error) {
    console.error('Error al eliminar la película del carrito:', error);
    return error
  }
};
