const getMovies = require('../controllers/getMovies');
const getUsers = require('../controllers/getUsers');
const getPurchases = require('../controllers/getPurchases');

module.exports = async(query)=>{
    user = query.user;
    const data = {};

    if(user.role.role === 'admin'){

        data.movies = await getMovies({limit:10});
        data.users  = await getUsers({limit:10});
        data.purchases  = await getPurchases({limit:10});
    }

    if(user.role.role === 'producer'){

        data.movies = await getMovies({limit:10,user:user.id});
        data.purchases  = await getPurchases({limit:10,user:user.id});
    }

    return data;
}