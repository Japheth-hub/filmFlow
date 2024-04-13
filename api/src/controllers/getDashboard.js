const getMovies = require('../controllers/getMovies');
const getUsers = require('../controllers/getUsers');
const getPurchases = require('../controllers/getPurchases');
const getGenres = require('../controllers/getGenres');
const getReportsMonth = require('../controllers/getReportsMonth');

module.exports = async(query)=>{
    const {user} = query;
    let data = {};

    if(user.role.role === 'admin'){

        const purchasesMonth = await getPurchases({month:true});
        const totalPurchasesMonth = purchasesMonth.reduce((accumulator, item) => {
            return accumulator + Math.floor(Number(item.amount));
          }, 0);
        
        const usersToday = await getUsers({today:true});
        const totalUsersToday = usersToday.length;
        const moviesToday = await getMovies({today:true,orderType:"id",order:'desc'});
        const totalMoviesToday = moviesToday.length;
        const moviesByGenre = await getGenres({movies:true});
        const totalMoviesByGenre = moviesByGenre.map((genre)=>{
            genre = {
                name:genre.name,
                movies:genre.movies.length
            }
            return genre
        })
 

        data = {
            moviesToday,
            totalMoviesToday,
            usersToday,
            totalUsersToday,
            purchasesMonth,
            totalPurchasesMonth,
            totalMoviesByGenre
        }
        
    }

    if(user.role.role === 'producer'){
      
        const purchasesTotalMonth = await getReportsMonth({user});
        const movies = await getMovies({user:user});

        console.log("purcahses",purchasesTotalMonth);

        data = {
            purchasesTotalMonth,
            movies
        }

    }

    return data;
}