
const getMovies = require('../controllers/getMovies');
const getUsers = require('../controllers/getUsers')

module.exports = async (req,res)=>{
    user = req.user;
    const data = {};

    if(user.role.role === 'admin'){

        data.movies = await getMovies({limit:10,user:1,search:"mat"});
        data.users  = await getUsers({limit:10});
        data.purchases  = await getPurchases({limit:10});
    }
    
    return res.json(data);


}