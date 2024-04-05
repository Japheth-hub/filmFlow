module.exports = ({movies, sid}) => {
  try {
    const products = [];
    const metaData = {};
    const movieIds = [];
    for (let movie of movies) {
      const product = {
        price_data: {
          currency: "usd",
          product_data: {
            name: movie.name,
            images: [movie.poster],
          },
          unit_amount: Number(movie.price) * 100,
        },
        quantity: 1,
      };
  
      movieIds.push(movie.id);
      products.push(product);
    }
    metaData.movies = movieIds.join(",");
    metaData.sid = sid
    return { products, metaData }
  } catch (error) {
    console.log("error webhook",error);
  }
};
