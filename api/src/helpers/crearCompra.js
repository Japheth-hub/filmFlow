module.exports = ({movies, sid}) => {
  const products = [];
  const metaData = {};
  for (let movie of movies) {
    const product = {
      price_data: {
        currency: "usd",
        product_data: {
          name: movie.name,
          images: [movie.poster],
        },
        unit_amount: 2500,
      },
      quantity: 1,
    };

    metaData[movie.id] = movie.name;
    // metaData[movie.id] = movie.id;
    
    products.push(product);
  }
  metaData.sid = sid
  return { products, metaData }
};
