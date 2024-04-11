
const calculateDiscount = require('../services/calculateDiscount');
const validateDiscount = require('../services/validateDiscount');
const { Movie, Genre } = require('../db');
const { Op } = require('sequelize');
module.exports = async(query) =>{
    let {code,movies} = query;
    try {

        const data = await validateDiscount(code)
        if(data.status){
            const moviesIds  = movies.map((movie)=>movie.id);
            let moviesDB = await Movie.findAll({
                where: {
                    id: {
                        [Op.in]: moviesIds
                    }
                },
                attributes:['id',"name","price","poster"],
                include:{
                    model:Genre,
                    attributes:['name'],
                    through: { attributes: [] }
                }
            });

            movies = moviesDB.map((movie)=>{
                
                // Si trae películas, le asignamos el descuento a esas películas
                if(data.discount.movies){
                    if(data.discount.movies.find((item)=> item.id === movie.id)){
                        movie.price = calculateDiscount(movie.price,data.discount.percentage);
                    }
                }

                // Si trae géneros, le asignamos el descuento a las películas de esos géneros
                if(data.discount.genres){
                    const hasDiscount = movie.genres.some(movieGenre =>
                        data.discount.genres.some(discountGenre =>
                            movieGenre.name === discountGenre.name
                        )
                    );
                    if(hasDiscount){
                        movie.price = calculateDiscount(movie.price,data.discount.percentage);
                    }
                }

                

                // Si no tiene géneros ni películas asignadas le aplicamos el descuento a todas las películas
                if(!data.discount.genres && !data.discount.genres){
                    movie.price = calculateDiscount(movie.price,data.discount.percentage);
                }

                return movie;
            });


            return {status:true,movies};
        }else{
            return {status:false,message:data.message};
        }
    } catch (error) {
        console.log(error);
        return false
    }
}