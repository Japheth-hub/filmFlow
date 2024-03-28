const sampleMovies = [
    {
        name: "Pulp Fiction",
        director: "Quentin Tarantino",
        genres: "Crime, Drama",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        duration: 154, 
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "The Matrix",
        director: "Lana Wachowski, Lilly Wachowski",
        genres: "Action, Sci-Fi",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        duration: 136, // duración en minutos
        country: "United States",
        poster: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "Forrest Gump",
        director: "Robert Zemeckis",
        genres: "Drama, Romance",
        description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
        duration: 142, // duración en minutos
        country: "United States",
        poster: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "The Lord of the Rings: The Fellowship of the Ring",
        director: "Peter Jackson",
        genres: "Action, Adventure, Drama",
        description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
        duration: 178, // duración en minutos
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "Inglourious Basterds",
        director: "Quentin Tarantino",
        genres: "Adventure, Drama, War",
        description: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
        duration: 153, // duración en minutos
        country: "United States",
        poster: "https://upload.wikimedia.org/wikipedia/en/c/c3/Inglourious_Basterds_poster.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "The Green Mile",
        director: "Frank Darabont",
        genres: "Crime, Drama, Fantasy",
        description: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
        duration: 189,
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "The Godfather: Part II",
        director: "Francis Ford Coppola",
        genres: "Crime, Drama",
        description: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
        duration: 202,
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "Schindler's List",
        director: "Steven Spielberg",
        genres: "Biography, Drama, History",
        description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        duration: 195,
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "The Lion King",
        director: "Roger Allers, Rob Minkoff",
        genres: "Animation, Adventure, Drama",
        description: "Lion cub and future king Simba searches for his identity. His eagerness to please others and penchant for testing his boundaries sometimes gets him into trouble.",
        duration: 89,
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "The Dark Knight",
        director: "Christopher Nolan",
        genres: "Action, Crime, Drama",
        description: "When the menace known as The Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        duration: 152,
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "Toy Story",
        director: "John Lasseter",
        genres: "Animation, Adventure, Comedy",
        description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
        duration: 81,
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "The Godfather",
        director: "Francis Ford Coppola",
        genres: "Crime, Drama",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        duration: 175,
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "Avatar",
        director: "James Cameron",
        genres: "Action, Adventure, Fantasy",
        description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
        duration: 162,
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "Interstellar",
        director: "Christopher Nolan",
        genres: "Adventure, Drama, Sci-Fi",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        duration: 169,
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "Ratatouille",
        director: "Brad Bird",
        genres: "Animation, Comedy, Family",
        description: "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous restaurant.",
        duration: 111,
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/y89kFMNYXNKMdlZjR2yg7nQtcQH.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "Amélie",
        director: "Jean-Pierre Jeunet",
        genres: "Comedy, Romance",
        description: "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
        duration: 122,
        country: "France",
        poster: "https://image.tmdb.org/t/p/original/2TeJfUZMGolfDdW6DKhfIWqvq8y.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "The Shawshank Redemption",
        director: "Frank Darabont",
        genres: "Drama",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        duration: 142,
        country: "United States",
        poster: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "Fight Club",
        director: "David Fincher",
        genres: "Drama",
        description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
        duration: 139,
        country: "United States",
        poster: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "The Silence of the Lambs",
        director: "Jonathan Demme",
        genres: "Crime, Drama, Thriller",
        description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
        duration: 118,
        country: "United States",
        poster: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
    {
        name: "Your Name",
        director: "Makoto Shinkai",
        genres: "Animation, Drama, Fantasy, Romance",
        description: "Mitsuha, a rural girl, and Taki, a Tokyo boy, swap bodies sporadically. Their connection deepens as they yearn to meet after two stars fall.",
        duration: 107,
        country: "Japan",
        poster: "https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNzYzZS00OTViLTkxYjAtZDIyZmE1Y2U1ZmQ2XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
        trailer: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4",
        movie: "https://res.cloudinary.com/dtn2ewtqg/video/upload/v1711218456/movies/prnsgwdtbqoqsfuwtegy.mp4"
    },
];

module.exports = sampleMovies;
