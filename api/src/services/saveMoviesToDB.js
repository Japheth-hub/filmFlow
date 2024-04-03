const movies = require('../utils/movies');
const { Movie, Genre } = require('../db');

module.exports = async () => {
    let count = 0
    try {
        for (const actualMovie of movies) {
            const { name, director, genres, description, duration, country, poster, trailer, movie } = actualMovie;

            const [movieDB, created] = await Movie.findOrCreate({
                where: { name },
                defaults: {
                    director,
                    description,
                    duration,
                    country,
                    poster,
                    trailer,
                    movie,
                    status: "pending", 
                    price: 25,
                    year: 2020
                }
            });

            if (!created) continue;

            const genresArray = genres.split(',').map(genre => genre.trim());

            for (const genreName of genresArray) {
                let genre = await Genre.findOne({ where: { name: genreName.toLocaleLowerCase() } });

                await movieDB.addGenre(genre);
            }
            count++
        }

        console.log(`Successfully created ${count} movies`);
    } catch (error) {
        console.error('Error saving movies to the database:', error);
    }
};
