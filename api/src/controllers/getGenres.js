const {Genre,Movie} = require('../db')
module.exports = async (query)=>{
    const {movies} = query;
    const options = {};
    try {
        if(movies){
            options.include = {
                model:Movie
            }
        }
        const genres = await Genre.findAll({...options})
        return genres
    } catch (error) {
        console.log(error)
        return error
    }    
}