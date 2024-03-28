const { Cart } = require('../db');

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
      return data.exit = 'Pelicula eliminada con exito del carrito'
    }
    return data.message = 'Pelicula no existe'
  } catch (error) {
    console.error('Error al eliminar la película del carrito:', error);
    return error
  }
};
