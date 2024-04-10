import axios from 'axios'
const URL = process.env.NEXT_PUBLIC_URL;


export const showMovies = async () => {
  try {
    const { data } = await axios(`${URL}movies?paranoid=false`);
    const clearData = data.map((movie) => {
      return {
        id: movie.id,
        name: movie.name,
        duration: movie.duration,
        status: movie.status,
        userId: movie.userId,
        price: movie.price,
        genre: movie.genres.map((genero) => genero.name).join("/"),
        deleted: movie.deletedAt ? movie.deletedAt.slice(0, 10) : "Active",
      };
    });
    return clearData;
  } catch (error) {
    console.log(error);
  }
};

export const showUsers = async (sid) => {
  try {
    const { data } = await axios.get(`${URL}users/${sid}`);
    const clearData = data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.roleName,
        sid: user.sid,
        created: user.createdAt.slice(0, 10),
        deleted: user.deletedAt ? user.deletedAt.slice(0, 10) : "",
      };
    });
    return clearData;
  } catch (error) {
    console.log("Error en la funcion showUsers de admin/page.jsx", error);
  }
};

export const showReviews = async () => {
  try {
    const { data } = await axios(`${URL}reviews`);
    const clearData = data.map((review) => {
      return {
        ...review,
        update: review.update.slice(0, 10),
      };
    });
    return clearData;
  } catch (error) {
    console.log(error);
  }
};
