
const coupon = require('coupon-code');
const { Op } = require('sequelize');
const { Discount, Movie, Genre, } = require('../db');
const isValidDate = require('../services/isValidDate');

module.exports = async (req, res) => {
    try {
        const { percentage,starts,ends,selectedMovies, selectedGenres } = req.body;

        if(!percentage){
            return {status:false,message:"faltan datos"} 
        }


        if(!Number.isInteger(percentage)){
            return {status:false,message:"el porcentaje debe ser un número entero"} 
        }

        if(starts && !isValidDate(starts)){
            return {status:false,message:"La fecha de comienzo tiene que ser futura"} 
        }
        
        if(ends && !isValidDate(ends)){
            return {status:false,message:"La fecha de témino tiene que ser futura"} 
        }



        const genCode = coupon.generate();

        const [discount,created] = await Discount.findOrCreate(
            { 
                where: { code: genCode },
                defaults:{
                    percentage,starts,ends
                }
            });


        if(created){
        
            if(selectedMovies.length && !selectedGenres.length){

                const movies = await Movie.findAll({where: {
                    id: {
                        [Op.in]: selectedMovies,
                    },
                }});
                console.log(movies);

                discount.setMovies(movies);
            }

            if(selectedGenres.length && !selectedMovies.length){

                const genres = await Genre.findAll({where: {
                    id: {
                        [Op.in]: selectedGenres,
                    },
                }});
        
                discount.setGenres(genres);
            }
    
            return {status:true,discount}
        }else{
            return {status:false,message:"El código ya existe"}
        }


    } catch (error) {
        console.error("Error generating code:", error);
        return {status:false,message:error}
    }
};

