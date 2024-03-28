const { Movie,Genre } = require('../db')
const cloudinary = require('cloudinary').v2;
require("dotenv").config();
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

module.exports = async (body) => {
    try {
        const data = {}

        let { name, director, genres, description, duration, country, posterFile, movieFile, trailerFile} = body;

        if (![name, director, genres, description, duration, country, posterFile, movieFile, trailerFile].every(Boolean)) {
            return data.message = "Faltan datos"
        }
        const status = "pending" 

        //Cloudinary:
        //Convertir el archivo a buffer de bytes para que Cloudinary sea capaz de leerlo (Los .mp4 no se convierten a buffer)
        const posterBuffer = Buffer.from(posterFile);

        //Posteo de la imagen en Cloudinary
        const cloudinaryPosterResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: "posters"}, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result)
                })
                .end(posterBuffer);
        })

        //Posteo del trailer en Cloudinary
        const cloudinaryTrailerResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload(trailerFile, { resource_type: "video", folder: "trailers" }, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
        });

        //Posteo de la pelicula en el Cloudinary
        const cloudinaryMovieResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload(movieFile, { resource_type: "video", folder: "movies" }, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
        });

        //Guardo las URL recibidas en las variables que voy a mandar a la DB
        const poster = cloudinaryPosterResponse.secure_url;
        const trailer = cloudinaryTrailerResponse.secure_url;
        const movie = cloudinaryMovieResponse.secure_url;
        //

        const [movieDB, created] = await Movie.findOrCreate({
            where: { name },
            defaults: { poster, movie, trailer, director, description, duration, country, status },
        });

        
        if(created){
            genres = genres.split(',').map((item) => item.trim());
            for (genre of genres) {
                const genreDB = await Genre.findOne({
                    where: { name: genre },
                });
                
                if(genreDB){
                    movieDB.addGenre(genreDB);
                }
            }
        }

        if (!created) {
            return data.message = "Ya hay una pelicula con ese nombre"
        }

        return data.movie = movieDB
    } catch (error) {
        return error
    }
}