const { Movie, Genre, User, Review, Country } = require('../db');
const checkUserMoviePurchase = require('../services/checkUserMoviePurchase')
module.exports = async (query)=>{
    try {
        const data = {}
        const {id,user} = query;
        const movie = await Movie.findByPk(id, {
            include:[
                {
                    model:Genre,
                    attributes:["id","name","label","emoji"],
                    through: { attributes: [] }
                },
                {
                    model:Country,
                    attributes:["id","name","flag"],
                    through: { attributes: [] }
                },
                {
                    model: Review,
                    attributes: ['id', 'comment', 'points'],
                    include: [
                        {
                        model: User,
                        attributes: ['name', 'picture', 'email'] 
                        }
                    ]
                }
            ]
        })

        if(movie){
            if(user){
                if(await checkUserMoviePurchase(user.id,movie.id)){
                    console.log("puede comentar");
                    movie.dataValues.reviewPermission = true;
                }
                if(movie.userId && movie.userId === user.id){
                    movie.dataValues.isOwner = true;
                }
                if(user.role.role = "admin") {
                    movie.dataValues.isAdmin = true;
                }
            }
            return movie;
        }
        return data.message = 'No existe pelicula con ese Id'
    } catch (error) {
        return error
    }



}