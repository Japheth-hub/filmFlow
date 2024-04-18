const { Movie , Genre, Country } = require('../db');
const cloudinary = require('cloudinary').v2;
require("dotenv").config();
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

module.exports = async (id, body) => {  // Solo necesitamos el ID y el cuerpo
    try {
        const data = {};
        const movie = await Movie.findOne({ where: { id } });
        
        
        if (!movie) {
            return { message: 'No existe película con ese Id' };
        }

        
       
        for (let key in body) {
            if (key !== 'posterFile' && key !== 'trailerFile' && key !== 'movieFile', key !== 'genres', key !== 'countries') {
        
                if (body[key] !== null && body[key] !== undefined) {
                    movie[key] = body[key];
                }
            }
        }
            
            
       
        if(body.posterFile){
        const posterBuffer = Buffer.from(body.posterFile)

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

        // const poster = cloudinaryPosterResponse.url
        const poster = cloudinaryPosterResponse.secure_url;
       
        movie.poster = poster
        
    }
    if (body.genres) {
        body.genres = body.genres.splice(',').map((item) => item.trim());
    
        const genreDBs = await Promise.all(body.genres.map(genreName => 
            Genre.findOne({ where: { name: genreName } })
        ));
    
        const validGenres = genreDBs.filter(genre => genre);
    
         await movie.setGenres([]);
    
         await movie.setGenres(validGenres);
    }
    if (body.countries) {
        body.countries = body.countries.splice(',').map((item) => item.trim());
    
        const countryDBs = await Promise.all(body.countries.map(countryName => 
            Country.findOne({ where: { name: countryName } })
        ));
    
        const validCountries = countryDBs.filter(genre => genre);
    
        // Limpiar todas las relaciones de género existentes
        await movie.setCountries([]);
    
        // Agregar todas las nuevas relaciones de género
        await movie.setCountries(validCountries);
    }

       
if (body.trailerFile) {
    const trailerBuffer = Buffer.from(body.trailerFile);

    const trailerResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder: "trailers", resource_type: "video" }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
            .end(trailerBuffer);
    });

    movie.trailer = trailerResponse.secure_url;
}

if (body.movieFile) {
    const movieBuffer = Buffer.from(body.movieFile);

    const movieResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream({ folder: "movies", resource_type: "video" }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
            .end(movieBuffer);
    });

    movie.movie = movieResponse.secure_url;
}

        // Guardar la película actualizada en la base de datos
        movie.status = 'pending'
        await movie.save();

        data.movie = movie;
        return data;
    } catch (error) {
        return error;
    }
};