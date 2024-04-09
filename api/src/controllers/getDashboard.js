const getMovies = require('../controllers/getMovies');
const getUsers = require('../controllers/getUsers');
const getPurchases = require('../controllers/getPurchases');

module.exports = async(query)=>{
    const user = query.user;
    const data = {};

    if(user.role.role === 'admin'){

        const purchases = await getPurchases({limit:10,month:true});
        const purchasesSum = purchases.reduce((accumulator, item) => {
            return accumulator + Number(item.amount);
          }, 0);

        data.movies = await getMovies({limit:10,orderType:"id",order:'desc'});
        data.users  = await getUsers({limit:10});
        data.purchases  = purchases;
        data.purchasesSum  = purchasesSum;
    }

    if(user.role.role === 'producer'){
        console.log("Soy producer");
        const purchases = await getPurchases({limit:10,user:user.id,month:true});
        const purchasesSum = purchases.reduce((total, purchase) => {
          // Sumar los precios de las películas dentro de cada compra
          const purchaseTotal = purchases.reduce((purchaseTotal, innerPurchase) => {
              const moviesTotal = innerPurchase.movies.reduce((moviesTotal, movie) => {
                  return moviesTotal + movie.movie_purchase.price; // Sumar los precios de las películas
              }, 0);
              return purchaseTotal + moviesTotal; // Sumar el total de precios de las películas en esta compra
          }, 0);
          
          return total + purchaseTotal; // Sumar el total de precios de las películas en todas las compras
      }, 0);
        data.movies = await getMovies({limit:10,user:user});
        data.purchases  = purchases
        data.purchasesSum  = purchasesSum;
    }

    return data;
}