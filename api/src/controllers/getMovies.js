const { Movie, Genre } = require('../db');
const { Op } = require("sequelize");
const orderFunction = require('../helpers/order')


module.exports = async function getMovies(query){

    let {search, genre, orderType, order,limit,user} = query;
    type = orderType || ""; 
    order = order || "asc"; 
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

        if(user){
            if(!options.where){
                options.where = {};
            }
            options.where.userId = user;
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
                    [orderType, order.toLowerCase()]
                ]
            }
        }
        
        const movies = await Movie.findAll({...options,attributes: ['id','name',"poster","trailer","movie","director","description","duration","country","status", "price"]})

        if(movies.length === 0){
            return data.message = 'No hay Peliculas'
        }

        return movies
    } catch (error) {
        console.log(error)
        return error
    }
}