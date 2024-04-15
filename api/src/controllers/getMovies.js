const { Movie, Genre,Country,Purchase, User, Review } = require('../db');
const { Op } = require("sequelize");

module.exports = async function getMovies(query){

    let {search, genre, orderType, order,limit,user,country,purchases, paranoid,today, admin, userSid } = query;
   
    try {
        let options = {
            include: [
                {
                    model: Genre,
                    attributes: ["id", "name"],
                    through: { attributes: [] }
                },
                {
                    model: Country, 
                    attributes: ["id", "name"]
                },
                {
                    model: User, 
                    attributes: ["id", "name"]
                },
                {
                    model: Review, 
                    attributes: ["id", "comment", "points"]
                }
            ],
            where: {}
        };

        if(search){
            options.where = {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            }
        }

        if (genre) {
            genre = genre.split(',').map((item) => item.trim().toLowerCase());
            options.include[0].where = {
                name: {
                    [Op.or]: genre
                }
            };
        }

        if(user && user.role.role !== 'admin'){
            if(!options.where){
                options.where = {};
            }
            options.where.userId = user.id;
        }

        if(userSid) {
            const user = await User.findOne({ where: { sid: userSid}})
            options.where.userId = user.id;
        }

        if(today){
            if(!options.where){
                options.where = {};
            }
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            options.where.createdAt = {
                [Op.gte]: currentDate  
            }
        }

        if(limit){
            options = {
                ...options,
                limit
            }
        }

        if (country) {
            country = country.split(',').map((item) => item.trim().toLowerCase());
            options.include[1].where = {
                name: {
                    [Op.or]: country
                }
            };
        }

        if (purchases) {
            const endDate = new Date();
            const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
         
            options.include = [
               ...options.include,
               {
                model:Purchase,
                required: true,
                where:{
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }
               } 
            ]
        }

        if(orderType){    
            options = {
                ...options,
                order: [
                    [orderType, order ? order.toLowerCase(): "asc"]
                ]
            }
        }

        if(paranoid === "false"){
            options = {
                ...options,
                paranoid: false
            }
        }

        if (!admin || admin === "false") {
            options.where.status = "approved";
        } 
        
        const movies = await Movie.findAll({...options,attributes: ['id','name',"poster","trailer","movie","director","description","duration","status", "price", "deletedAt"]})


        console.log(options);
        return movies
    } catch (error) {
        console.log(error)
        return error
    }
}