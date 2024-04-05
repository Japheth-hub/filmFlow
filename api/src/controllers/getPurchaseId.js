const { User, Movie, Purchase } = require("../db");

module.exports = async (req) => {
    try {
        const user = req.user
        let purchasedMovies = [];

        const userDB = await User.findByPk(user.id, {
            include: {
              model: Purchase,
              include: {
                model: Movie,
              },
            },
          });


        if (userDB && userDB.purchases) {
            userDB.purchases.map(purchase => purchasedMovies = [...purchasedMovies,...purchase.movies]);
            console.log(purchasedMovies);
            return purchasedMovies;
        } else {
            console.log('El usuario no tiene películas compradas.');
        }

        return purchasedMovies;
        
    } catch (error) {
        console.log(error);
        return error
    }
}
