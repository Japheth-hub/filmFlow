const { Movie, Genre, User, Review } = require('../db');

module.exports = async (id)=>{
    try {
        const data = {};
        const movie = await Movie.findByPk(id, {
            include:[
                {
                    model:Genre,
                    attributes:["id","name"],
                    through: { attributes: [] }
                },
                {
                    model: Review,
                    attributes: ['id', 'comment', 'points'],
                    include: [
                        {
                        model: User,
                        attributes: ['name', 'img'] 
                        }
                    ]
                }
            ]
        })
        console.log(movie)
        if(movie){
            return data.content = movie
        }
        return data.message = 'No existe pelicula con ese Id'
    } catch (error) {
        return error
    }



}