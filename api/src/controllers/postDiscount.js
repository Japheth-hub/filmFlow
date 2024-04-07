
const coupon = require('coupon-code');
const { Discount, Movie, Genre, discount_movie, discount_genre } = require('../db');

module.exports = async (req, res) => {
    try {
        let genCode;

        do {
            genCode = coupon.generate();
        } while (await Discount.findOne({ where: { code: genCode } }));

        const { discount } = req.body;

        const createdDiscount = await Discount.create({ code: genCode, percentage: discount });

        const { selectedMovies, selectedGenres } = req.body;

        if (selectedMovies && selectedMovies.length > 0) {
            await Promise.all(selectedMovies.map(async (movieId) => {
                await discount_movie.create({ discountId: createdDiscount.id, movieId });
            }));
        }

        if (selectedGenres && selectedGenres.length > 0) {
            await Promise.all(selectedGenres.map(async (genreId) => {
                await discount_genre.create({ discountId: createdDiscount.id, genreId });
            }));
        }

        res.status(201).json({ code: genCode });
    } catch (error) {
        console.error("Error generating code:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

