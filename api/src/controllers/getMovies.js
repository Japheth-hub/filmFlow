const { Movie, Genre,User,Role } = require('../db');
const { Op } = require("sequelize");
const orderFunction = require('../helpers/order')


module.exports = async function getMovies(query){

    let {search, genre, orderType, order,limit,user} = query;
   
    try {
        let data = {}
        let options = {
            include:{
                model:Genre,
                attributes:["id","name"],
                through: { attributes: [] }
            }
        }; 

        if(search){
            options.where = {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            }
        }

        if(genre){    
            genre = genre.split(',').map((item) => item.trim().toLowerCase());
            options.include = {
                ...options.include,
                where: { 
                    name: { 
                      [Op.or]: genre
                    }
                },
            }
        }

        if(user && user.role.role !== 'admin'){
            if(!options.where){
                options.where = {};
            }
            options.where.userId = user.id;
        }

        if(limit){
            options = {
                ...options,
                limit
            }
        }

        if(orderType){    
            options = {
                ...options,
                order: [
                    [orderType, order ? order.toLowerCase(): "asc"]
                ]
            }
        }
        
        const movies = await Movie.findAll({...options,attributes: ['id','name',"poster","trailer","movie","director","description","duration","status", "price"]})

        if(movies.length === 0){
            return data.message = 'No hay Peliculas'
        }

        return movies
    } catch (error) {
        console.log(error)
        return error
    }
}