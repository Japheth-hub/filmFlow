const postCheckout = require("../controllers/postCheckout");
const crearCompra = require('../helpers/crearCompra')

module.exports = async (req, res) => {
  try {
    const  {movies,user,code}  = req.body;

    if (!movies || movies.length === 0) {
      res.status(404).json("No hay productos");
      return;
    }
    const {products, metaData} = await crearCompra({movies,user,code})
    const session = await postCheckout(products, metaData)
    res.status(200).json(session);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};
