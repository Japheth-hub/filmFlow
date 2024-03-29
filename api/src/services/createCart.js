const {Cart,Movie} = require('../db');
module.exports = async(user)=>{
    const movies = [];
    const cart = await Cart.findAll({
        where: {
          userId:user.id
        },
      });
  
      if (cart && cart.length > 0) {
        
        const movieIds = cart.map((item) => item.movieId);
  
        for (const movieId of movieIds) {
          const movie = await Movie.findByPk(movieId, {
            attributes: ["id", "name", "poster"],
          });
          movies.push(movie.toJSON());
        }
  
        movies.sid = user.sid;
        
    }
    
    return movies;
}